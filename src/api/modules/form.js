import ajax from "@plugins/ajax";

/**
 * 获取表格管理列表
 * @param params
 * @returns {void|*}
 */
export function formList(params) {
    return ajax.get('userServer/customForm/list',params);
}

/**
 * 获取单条表格管理
 * @param id
 * @returns {void|*}
 */
export function formInfo(id) {
    return ajax.get(`userServer/customForm/find/${id}`,null);
}

/**
 * 删除
 * @param id
 * @returns {void|*}
 */
export function formDel(id) {
    return ajax.post(`userServer/customForm/del/${id}`,null);
}

/**
 * 添加
 * @param data
 * @returns {*}
 */
export function formAdd(data) {
    return ajax.post('userServer/customForm/save', data);
}

/**
 * 修改
 * @param data
 * @returns {*}
 */
export function formEdit(data) {
    return ajax.post('userServer/customForm/edit', data);
}
