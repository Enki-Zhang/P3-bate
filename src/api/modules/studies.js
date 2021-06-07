import ajax from "@plugins/ajax";

// 研学旅管理

export function yxlList(params) {
    return ajax.get('backServer/yxl/list', params);
}
export function yxlSave(data) {
    return ajax.post('backServer/yxl/save', data);
}
export function yxlFind(params) {
    return ajax.get(`backServer/yxl/find/${params}`);
}
export function yxlEdit(data) {
    return ajax.post('backServer/yxl/edit', data);
}
export function yxlDel(data) {
    return ajax.post(`backServer/yxl/del/${data}`);
}
export function yxlExample(params) {
    return ajax.getBlob(`backServer/yxl/example`, params);
}
export function yxlImport(data) {
    return ajax.upload('backServer/yxl/import', data);
}


