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
    isInitLoaded = false,
    isFullLoaded = false,
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
    // console.log(to);
    // console.log(from);
    // console.log(next);
    // console.log(token);
    // console.log(uuid);
    // console.log(userInfo);
    // console.log(routerStatus);

    // 初始加载
    if(!isInitLoaded) {
        await loadRoutes(false);
        isInitLoaded = true;
        next(to.fullPath, true);
    }
    // 未登录
    else if(!token || !uuid || !userInfo) {
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
        if(!isFullLoaded) {
            await loadRoutes(true);
            isFullLoaded = true;
            next(to.fullPath, true);
        } else if(to.matched.length) {
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
    next();
});
router.afterEach(to => {NProgress.done();});

// 加载路由线路
let loadRoutes = async (isFullLoad) => {
    // 线路组件合并
    const mergeRoutesComponents = function (routes, isSetRedirect = true) {
        routes.forEach(route => {
            route.component = routerComponentsMap[route.name];
            if(!!route.redirectToName) route.redirect = {name: route.redirectToName};
            if(!!route.children) mergeRoutesComponents(route.children, true);
        });
        return routes;
    };

    //物资管理根据是否绑定formKey进行过滤
    const thingManageFilter = function(arr){
        arr.forEach(route => {
            //console.log(route);
            if(route.name === "supplies"){
                let lastChildren = [];
                let children = route.children;
                for(var i = 0;i < children.length;i++){
                    if(!!children[i].formKey){
                        children[i].meta.formKey = children[i].formKey;
                        lastChildren.push(children[i]);
                    }
                }
                route.children = lastChildren;
            }
        });
        return arr;
    }

    // 完整加载
    if(isFullLoad) {
        if(!!userInfo && !!userInfo.menus && !!userInfo.menus.length) {
            let userInfoMenu = JSON.parse(JSON.stringify(userInfo.menus));
            userInfoMenu = thingManageFilter(userInfoMenu);
            console.log(userInfoMenu);
            routes.inLayout.children = [...routes.inLayout.children.concat(userInfoMenu)];
        }
        router.addRoutes(mergeRoutesComponents([
            routes.inLayout,
            ...routes.outOfLayout,
            ...routes.errors
        ]));
    }
    // 初始化
    else router.addRoutes(mergeRoutesComponents([...routes.init]));
    await Promise.resolve();
};

// 修复提示重定向报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
}

export default router;