// 懒加载会导致开发环境 webpack 热更新，故生产环境才使用
const _import = require('@plugins/dynamic-import/import.views.' + process.env.NODE_ENV);
import layout from "@layout/layout";

let routerComponentsMap = {
    // 引入布局文件
    'layout': layout,
    // 欢迎页
    'welcome': _import('welcome'),
    // 测试页
    'hello': _import('demo/hello'),
};

const files = require.context('./modules/', true, /\.js$/);
files.keys().forEach((key) => {
    if(key === './index.js') return;
    Object.assign(routerComponentsMap, files(key).default);
});

export default routerComponentsMap;