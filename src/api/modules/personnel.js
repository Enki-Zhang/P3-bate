import ajax from "@plugins/ajax";

// 组织架构

export function menuPermission(params) {
    return ajax.get('userServer/menu/permission', params);
}
export function menuTree(params) {
    return ajax.get('userServer/menu/tree', params);
}
export function sysRoleList(params) {
    return ajax.get('userServer/sysRole/list', params);
}
export function sysRoleFind(params) {
    return ajax.get(`userServer/sysRole/find/${params}`);
}
export function sysRoleAdd(data) {
    return ajax.post('userServer/sysRole/save', data);
}
export function sysRoleEdit(data) {
    return ajax.post('userServer/sysRole/edit', data);
}
export function sysRoleDel(data) {
    return ajax.post(`userServer/sysRole/del/${data}`);
}

// 人事信息管理

export function sysUserInfoList(params) {
    return ajax.get('userServer/sys/user/info/list', params);
}
export function sysUserInfoSelect(params) {
    return ajax.get('userServer/sys/user/info/select', params);
}
export function sysRoleSelect(params) {
    return ajax.get('userServer/sysRole/select', params);
}
export function sysUserInfoFind(params) {
    return ajax.get(`userServer/sys/user/info/find/${params}`);
}
export function sysUserInfoSave(data) {
    return ajax.post(`userServer/sys/user/info/save`, data);
}
export function sysUserInfoEditSelf(data) {
    return ajax.post(`userServer/sys/user/info/editSelf`, data);
}
export function sysUserInfoEdit(data) {
    return ajax.post(`userServer/sys/user/info/edit`, data);
}
export function sysUserInfoDel(data) {
    return ajax.post(`userServer/sys/user/info/del/${data}`);
}
export function sysUserInfoPwd(data) {
    return ajax.post(`userServer/sys/user/info/pwd`, data);
}
export function sysUserInfoGroup(data) {
    return ajax.post(`userServer/sys/user/info/group`, data);
}
export function sysUserInfoExport(params) {
    return ajax.getBlob('userServer/sys/user/info/export', params);
}

// 研究生信息管理

export function sysYjsInfoList(params) {
    return ajax.get('userServer/sys/yjs/info/list', params);
}
export function sysYjsInfoFind(params) {
    return ajax.get(`userServer/sys/yjs/info/find/${params}`);
}
export function sysYjsInfoSave(data) {
    return ajax.post(`userServer/sys/yjs/info/save`, data);
}
export function sysYjsInfoEdit(data) {
    return ajax.post(`userServer/sys/yjs/info/edit`, data);
}
export function sysYjsInfoDel(data) {
    return ajax.post(`userServer/sys/yjs/info/del/${data}`);
}
export function sysYjsInfoPwd(data) {
    return ajax.post(`userServer/sys/yjs/info/pwd`, data);
}
export function sysYjsInfoGroup(data) {
    return ajax.post(`userServer/sys/yjs/info/group`, data);
}
export function sysYjsInfoExport(params) {
    return ajax.getBlob('userServer/sys/yjs/info/export', params);
}