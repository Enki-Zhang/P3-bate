// 懒加载会导致开发环境 webpack 热更新，故生产环境才使用
const _import = require("@plugins/dynamic-import/import.views." +
  process.env.NODE_ENV);

// 单菜单
export default {
  // 系统管理
  settings: _import("settings"),

  // 菜单管理
  "settings_menu-manage": _import("settings/menuManage"),
  // 'personnel_organization|add': _import('personnel/organization/edit'),
  // 'personnel_organization|edit': _import('personnel/organization/edit'),
};
