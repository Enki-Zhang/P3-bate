// 懒加载会导致开发环境 webpack 热更新，故生产环境才使用
const _import = require('@plugins/dynamic-import/import.views.' + process.env.NODE_ENV);

// 单菜单
export default {
    // 生物安全实验室管理体系文件
    // 'system_doc': _import('systemDoc'),

    // 安全管理手册
    // 'system_doc_management_manual': _import('systemDoc/managementManual'),
    // 'system_doc_management_manual_add': _import('systemDoc/managementManual/edit'),
    // 'system_doc_management_manual_edit': _import('systemDoc/managementManual/edit'),

    // 程序文件
    // 'system_doc_program_files': _import('systemDoc/programFiles'),
    // 'system_doc_program_files_add': _import('systemDoc/programFiles/edit'),
    // 'system_doc_program_files_edit': _import('systemDoc/programFiles/edit'),
    // 'system_doc_program_files_edit': _import('systemDoc/programFiles/bpmn'),


};