import ajax from "@plugins/ajax";

// 栏目管理

export function navigationTree(params) {
    return ajax.get('backServer/navigation/tree', params);
}
export function navigationTreeByDepartmentId(params) {
    return ajax.get('backServer/navigation/treeByDepartmentId', params);
}
export function navigationSave(data) {
    return ajax.post('backServer/navigation/save', data);
}
export function navigationFind(params) {
    return ajax.get(`backServer/navigation/find/${params}`);
}
export function navigationEdit(data) {
    return ajax.post('backServer/navigation/edit', data);
}
export function navigationDel(data) {
    return ajax.post(`backServer/navigation/del/${data}`);
}
export function navigationStatus(data) {
    return ajax.post(`backServer/navigation/status/${data.id}/${data.status}`);
}
export function templateFindList(params) {
    return ajax.get(`backServer/template/findList`, params);
}

// 轮播图管理

export function bannerList(params) {
    return ajax.get('backServer/banner/list', params);
}
export function bannerSave(data) {
    return ajax.post('backServer/banner/save', data);
}
export function bannerFind(params) {
    return ajax.get(`backServer/banner/find/${params}`);
}
export function bannerEdit(data) {
    return ajax.post('backServer/banner/edit', data);
}
export function bannerDel(data) {
    return ajax.post(`backServer/banner/del/${data}`);
}
export function bannerDelBatch(data) {
    return ajax.post(`backServer/banner/delBatch/${data}`);
}
export function bannerAudit(data) {
    return ajax.post('backServer/banner/audit', data);
}

// 在线留言

export function feedbackList(params) {
    return ajax.get('backServer/feedback/list', params);
}
export function feedbackFind(params) {
    return ajax.get(`backServer/feedback/find/${params}`);
}
export function feedbackSave(data) {
    return ajax.post('backServer/feedback/save', data);
}

// 站点设置

export function seoFind(params) {
    return ajax.get(`backServer/seo/find`, params);
}
export function seoEdit(data) {
    return ajax.post('backServer/seo/edit', data);
}
export function seoCacheClean(data) {
    return ajax.post(`backServer/seo/cache/clean`, data);
}

