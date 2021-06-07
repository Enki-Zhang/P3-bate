import ajax from "@plugins/ajax";

// 会员管理

export function memberList(params) {
    return ajax.get('userServer/member/list', params);
}
export function memberSave(data) {
    return ajax.post('userServer/member/save', data);
}
export function memberFind(params) {
    return ajax.get(`userServer/member/find/${params}`);
}
export function memberEdit(data) {
    return ajax.post('userServer/member/edit', data);
}
export function memberFreeze(data) {
    return ajax.post(`userServer/member/freeze/${data}`);
}
export function memberUnFreeze(data) {
    return ajax.post(`userServer/member/unfreeze/${data}`);
}
export function uploadZz(data) {
    return ajax.upload('userServer/file/zz/upload', data);
}
export function downloadZz(params) {
    return ajax.getBlob(`userServer/file/zz/download`, params);
}
export function fileHeadUpload(data) {
    return ajax.upload(`userServer/file/head/upload`, data);
}


