import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// element-ui
import '@plugins/element-ui';
import '@plugins/element-ui/style/theme/index.css';

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