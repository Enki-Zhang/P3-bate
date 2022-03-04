// 懒加载会导致开发环境 webpack 热更新，故生产环境才使用
const _import = require('@plugins/dynamic-import/import.views.' + process.env.NODE_ENV);

// 单菜单
export default {
    // 人员管理
    'personnel': _import('personnel'),

    // 组织架构
    'personnel_organization': _import('personnel/organization'),
    'personnel_organization|add': _import('personnel/organization/edit'),
    'personnel_organization|edit': _import('personnel/organization/edit'),

    // 人事信息管理
    'personnel_information': _import('personnel/information'),
    // 'personnel_information|add': _import('personnel/information/edit'),
    'personnel_information|edit': _import('personnel/information/edit'),
    'personnel_information|detail': _import('personnel/information/detail'),

    // 研究生信息管理
    'personnel_graduate': _import('personnel/graduate'),
    'personnel_graduate|add': _import('personnel/graduate/edit'),
    'personnel_graduate|edit': _import('personnel/graduate/edit'),
    'personnel_graduate|detail': _import('personnel/graduate/detail'),


    // 考勤一览表
    'personnel_attendance-overview': _import('personnel/attendanceOverview'),


};