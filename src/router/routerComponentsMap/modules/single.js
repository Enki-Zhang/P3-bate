// 懒加载会导致开发环境 webpack 热更新，故生产环境才使用
const _import = require('@plugins/dynamic-import/import.views.' + process.env.NODE_ENV);

// 单菜单
export default {

    // 概览
    'workbench': _import('single/workbench'),

    // 生物安全实验室管理体系文件
    'system-doc': _import('single/systemDoc'),
    'system-doc|folder': _import('single/systemDoc/folder'), // 文件夹管理
    'system-doc|management-manual': _import('single/systemDoc/managementManual'), // 安全管理手册


    // 表格管理
    'forms': _import('single/forms'),
    'forms_version_manage': _import('single/forms/versionManage'),
};