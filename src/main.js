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

// vant
import '@plugins/vant';

// 挂载 man
import man from "@plugins/man";
Vue.prototype.man = man;

// run
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');