import ajax from "@plugins/ajax";

// 文章管理

export function articleList(params) {
    return ajax.get('backServer/article/list', params);
}
export function articleSave(data) {
    return ajax.post('backServer/article/save', data);
}
export function articleFind(params) {
    return ajax.get(`backServer/article/find/${params}`);
}
export function articleEdit(data) {
    return ajax.post('backServer/article/edit', data);
}
export function articleDel(data) {
    return ajax.post(`backServer/article/del/${data}`);
}
export function articleAudit(data) {
    return ajax.post(`backServer/article/audit`, data);
}

// 产品管理

export function productList(params) {
    return ajax.get('backServer/product/list', params);
}
export function productSave(data) {
    return ajax.post('backServer/product/save', data);
}
export function productFind(params) {
    return ajax.get(`backServer/product/find/${params}`);
}
export function productEdit(data) {
    return ajax.post('backServer/product/edit', data);
}
export function productDel(data) {
    return ajax.post(`backServer/product/del/${data}`);
}
export function productAudit(data) {
    return ajax.post(`backServer/product/audit`, data);
}


