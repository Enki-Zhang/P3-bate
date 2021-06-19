import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import man from "@plugins/man";
import routerComponentsMap from "./routerComponentsMap";
import routes from "@router/routes";
Vue.use(Router);

// 初始化路由
let router = new Router({routes: [], mode: 'history', base: process.env.VUE_APP_ROUTE_BASE}),
    token = false,
    uuid = false,
    userInfo = false,
    webSite = false;

// 守卫
router.beforeEach(async (to, from, next) => {
    NProgress.start();
    token = man.cookies.get('token');
    uuid = man.cookies.get('uuid');
    userInfo = man.db.load('session.userInfo');
    webSite = man.db.load('sys.webSite');
    if(!isLoaded) {
        await loadRoutes();
        isLoaded = true;
        next(to.path, true);
    } else {next();}
    // console.log(to);
    // console.log(from);
    // console.log(next);
    // console.log(token);
    // console.log(uuid);
    // console.log(userInfo);
    // console.log(routerStatus);

    // 未登录
    if(!token || !uuid || !userInfo) {
        if(to.fullPath !== '/auth/login') {
            man.db.save('tmp.backToRouteName', to.fullPath);
            man.db.save('tmp.backToRouteQuery', to.query);
        }
        if(to.matched.length) {
            switch (to.matched[0].name) {
                case 'auth':
                    switch (to.matched[1].name) {
                        case 'auth_login':
                            next();
                            break;
                        default:
                            next({name: 'auth_login'});
                            break;
                    }
                    break;
                default:
                    next({name: 'auth_login'});
                    break;
            }
        } else {next({name: 'auth_login'});}
    }
    // 已登录
    else {
        if(to.matched.length) {
            switch (to.matched[0].name) {
                case 'auth':
                    next({name: 'layout'});
                    break;
                default:
                    next();
                    break;
            }
        }
    }
    // 页面标题
    document.title = to.meta.title
        ? `${to.meta.title} Ι ${process.env.VUE_APP_TITLE_SHORT}`
        : process.env.VUE_APP_TITLE;
});
router.afterEach(to => {NProgress.done();});

// 加载路由线路
let isLoaded = false,
    loadRoutes = async () => {
        // 线路组件合并
        const mergeRoutesComponents = function (routes) {
            routes.forEach(route => {
                route.component = routerComponentsMap[route.name];
                if(route.children) mergeRoutesComponents(route.children);
            });
            return routes;
        };

        // 线路添加到路由
        if(userInfo && userInfo.menus && userInfo.menus.length) routes[0].children = [...routes[0].children, ...userInfo.menus,];
        router.addRoutes(mergeRoutesComponents(routes));
        await Promise.resolve();
    };

// 修复提示重定向报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
}

export default router;