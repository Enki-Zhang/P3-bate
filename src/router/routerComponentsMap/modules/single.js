// 懒加载会导致开发环境 webpack 热更新，故生产环境才使用
const _import = require("@plugins/dynamic-import/import.views." +
  process.env.NODE_ENV);

// 单菜单
export default {
  // 工作台
  workbench: _import("single/workbench"),

  // 生物安全实验室管理体系文件
  "system-doc": _import("single/systemDoc"),
  "system-doc|folder": _import("single/systemDoc/folder"), // 文件夹管理
  "system-doc|management-manual": _import("single/systemDoc/managementManual"), // 列表
  "system-doc|management-manual|version": _import(
    "single/systemDoc/managementManual/version"
  ), // 版本
  "system-doc|management-manual|add": _import(
    "single/systemDoc/managementManual/edit"
  ), // 新增
  "system-doc|management-manual|edit": _import(
    "single/systemDoc/managementManual/edit"
  ), // 编辑
  "system-doc|management-manual|detail": _import(
    "single/systemDoc/managementManual/detail"
  ), // 查阅
  "system-doc|management-manual|history": _import(
    "single/systemDoc/managementManual/history"
  ), // 历史

  // 表格管理
  activity: _import("single/activity"),
  "activity|bsl": _import("single/activity/bsl"),
  "activity|subject": _import("single/activity/subject"),
  "activity|equipment": _import("single/activity/equipment"),

  // 物资管理
  assets: _import("single/supplies"),
  assets_equipment: _import("single/supplies/device"),
  assets_consumables: _import("single/supplies/device"),
  "assets_sample-reagents": _import("single/supplies/device"),
  "assets_administrative-materials": _import("single/supplies/device"),
  "assets_other-materials": _import("single/supplies/device"),
  assets_car: _import("single/supplies/device"),
  assets_dormitory: _import("single/supplies/device"),

  // 表格管理
  forms: _import("single/forms"),
  "forms|forms-manage": _import("single/forms/formsManage"),
  "forms|forms-forms|add": _import("single/forms/formsManage/forms"),
  "forms|forms-forms|edit": _import("single/forms/formsManage/forms"),
  "forms|version-manage": _import("single/forms/versionManage"),
  "forms|process-design": _import("single/forms/processDesign"),
};
