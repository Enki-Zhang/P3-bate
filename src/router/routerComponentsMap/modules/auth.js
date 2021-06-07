// 懒加载会导致开发环境 webpack 热更新，故生产环境才使用
const _import = require('@plugins/dynamic-import/import.views.' + process.env.NODE_ENV);

export default {
    'auth': _import('auth'),
    'auth_login': _import('auth/login'),
};