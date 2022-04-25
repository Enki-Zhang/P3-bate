import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// element-ui
import '@plugins/element-ui';
import '@plugins/element-ui/style/theme/index.css';

// 代码高亮
import { vuePlugin } from "@/plugins/highlight";
import "highlight.js/styles/atom-one-dark-reasonable.css";
Vue.use(vuePlugin);

// 自定义 process designer
import MyProcessDesigner from "~package/index.js";
Vue.use(MyProcessDesigner);
import '~package/theme/index.scss';

// 签名
import vueEsign from 'vue-esign';
Vue.use(vueEsign);

// vant
import '@plugins/vant';

// 挂载 man
import man from "@plugins/man";
Vue.prototype.man = man;

//获取菜单id
Vue.prototype.getMenuId = function(){
	let storage_menus = JSON.parse(localStorage.getItem('stu-p3lab'));
    let menus = storage_menus.session.userInfo.menus;
    // console.log(menus);
    // console.log(this.$route.name);
    function findMenuId(arr,name){
        let tempId = null;
        for(let i = 0;i < arr.length;i++){
            if(arr[i].name == name){
                tempId = arr[i].id;
                break;
            }
            else{
                tempId = findMenuId(arr[i].children,name);
                if(tempId != null){
                    break;
                }
            }
        }
        if(tempId != null)
            return tempId;
        else
            return null;
    }
    let menuId = findMenuId(menus,this.$route.name);
    //console.log(menuId);
    return menuId;
}

// run
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');