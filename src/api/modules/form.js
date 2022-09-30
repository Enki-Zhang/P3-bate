import ajax from "@plugins/ajax";

/**
 * 获取表单结果
 * @param formKey
 * @returns {void|*}
 */
export function formStructInfo(formKey) {
  return ajax.get(`userServer/customForm/findByKey/${formKey}`, null);
}

/**
 * 获取物资管理列表
 * @param params
 * @returns {void|*}
 */
export function formInfoList(params) {
  return ajax.get("userServer/customFormInfo/list", params);
}

/**
 * 获取前置表单列表
 * @param params
 * @returns {void|*}
 */
export function formPrevList(params) {
  return ajax.get("userServer/customFormFrontTable/list", params);
}

/**
 * 添加前置表单
 * @param params
 * @returns {void|*}
 */
export function formPrevAdd(params) {
  return ajax.post(`userServer/customFormFrontTable/save`, params);
}

/**
 * 删除前置表单
 * @param id
 * @returns {void|*}
 */
export function formPrevDel(id) {
  return ajax.post(`userServer/customFormFrontTable/del/${id}`, null);
}

/**
 * 获取表单版本列表
 * @param params
 * @returns {void|*}
 */
export function formHistoryList(params) {
  return ajax.get("userServer/customFormHistory/list", params);
}
/***
 * 获取历史表单数据
 *
 */
/* export function formHistoryManagement(params) {
  return ajax.get("userServer/customFormInfo/list", params);
} */
/**
 * 设置表单主版本
 * @param id
 * @returns {void|*}
 */
export function formHistoryMain(id) {
  return ajax.post(`userServer/customFormHistory/resetVersion/${id}`, null);
}

/**
 * 删除
 * @param id
 * @returns {void|*}
 */
export function formHistoryDel(id) {
  return ajax.post(`userServer/customFormHistory/del/${id}`, null);
}

/**
 * 获取表格管理列表
 * @param params
 * @returns {void|*}
 */
export function formList(params) {
  return ajax.get("userServer/customForm/list", params);
}

/**
 * 获取单条表格管理
 * @param id
 * @returns {void|*}
 */
export function formInfo(id) {
  return ajax.get(`userServer/customForm/find/${id}`, null);
}

// 删除
export function customFormDeleteAllVersion(data) {
  return ajax.post(`userServer/customForm/deleteAllVersion/${data}`);
}

/**
 * 添加
 * @param data
 * @returns {*}
 */
export function formAdd(data) {
  return ajax.post("userServer/customForm/save", data);
}

/**
 * 修改
 * @param data
 * @returns {*}
 */
export function formEdit(data) {
  return ajax.post("userServer/customForm/edit", data);
}

/**
 * 获取绑定数据源列表
 * @param data
 * @returns {*}
 */
export function formSourceList() {
  return ajax.get("userServer/customForm/dynamicSelect/select", null);
}

/**
 * 获取数据源下拉列表
 * @param data
 * @returns {*}
 */
export function formSourceSelectList(id) {
  return ajax.get(`userServer/customForm/dynamicSelect/findById/${id}`, null);
}

// 上传base64图片
export function formUploadBase64(data) {
  return ajax.upload("backServer/file/base64/uploadFile", data);
}

// 流程图

export function camundaFindByProcessDefinitionById(params) {
  return ajax.get(`backServer/camunda/findByProcessDefinitionById/${params}`);
}
export function camundaDeploy(data) {
  return ajax.post("backServer/camunda/deploy", data);
}
export function workflowDesigner(params) {
  // return ajax.get(`backServer/workflow/designer/${params}`);
  return ajax.get(`backServer/workflow/designer/${params}`);
}
export function sysUserInfoTree(params) {
  return ajax.get(`userServer/sys/user/info/tree`, params);
}
export function workflowDesignerCreateOrUpdate(data) {
  return ajax.post("backServer/workflow/designer/createOrUpdate", data);
}
