// 懒加载会导致开发环境 webpack 热更新，故生产环境才使用
const _import = require('@plugins/dynamic-import/import.views.' + process.env.NODE_ENV);

// 单菜单
export default {

    // 概览
    'workbench': _import('single/workbench'),

    // 生物安全实验室管理体系文件
    'system-doc': _import('single/systemDoc'),
    'system-doc|folder': _import('single/systemDoc/folder'), // 文件夹管理
    'system-doc|management-manual': _import('single/systemDoc/managementManual'), // 列表
    'system-doc|management-manual|add': _import('single/systemDoc/managementManual/edit'), // 新增
    'system-doc|management-manual|edit': _import('single/systemDoc/managementManual/edit'), // 编辑
    'system-doc|management-manual|detail': _import('single/systemDoc/managementManual/detail'), // 查阅


    // 表格管理
    'forms': _import('single/forms'),
    'forms|forms-manage': _import('single/forms/formsManage'),
    'forms|forms-forms': _import('single/forms/formsManage/forms'),
    'forms|version-manage': _import('single/forms/versionManage'),
    'forms|process-design': _import('single/forms/processDesign'),
};