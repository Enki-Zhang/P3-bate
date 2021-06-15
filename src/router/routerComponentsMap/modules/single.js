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
    'system-doc|management-manual|add': _import('single/systemDoc/managementManual/edit'), // 安全管理手册 - 新增
    'system-doc|management-manual|release': _import('single/systemDoc/managementManual/release'), // 安全管理手册 - 发布
    'system-doc|management-manual|detail': _import('single/systemDoc/managementManual/detail'), // 安全管理手册 - 详情
    // 'system-doc|program-files': _import('single/systemDoc/programFiles'), // 程序文件


    // 表格管理
    'forms': _import('single/forms'),
    'forms_version_manage': _import('single/forms/versionManage'),
};