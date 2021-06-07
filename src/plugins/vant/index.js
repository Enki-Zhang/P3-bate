import Vue from 'vue';

import {
    Dialog,
    Toast,
} from 'vant';

Vue.use(Dialog);
Vue.use(Toast);


// 将所有 Toast 的展示时长设置为 2000 毫秒
Toast.setDefaultOptions({ duration: 0});
// 将所有 loading Toast 设置为背景不可点击 (2.2.10 版本开始支持)
Toast.setDefaultOptions('loading', { forbidClick: true });