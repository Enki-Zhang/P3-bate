import ajax from "@plugins/ajax";

// 组织架构

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

// 人事资料

export function sysUserList(params) {
    return ajax.get('userServer/sysUser/list', params);
}
export function sysUserSave(data) {
    return ajax.post('userServer/sysUser/save', data);
}
export function sysUserFind(params) {
    return ajax.get(`userServer/sysUser/find/${params}`);
}
export function sysUserEdit(data) {
    return ajax.post('userServer/sysUser/edit', data);
}
export function sysUserDel(data) {
    return ajax.post(`userServer/sysUser/del/${data}`);
}
export function sysUserResetPwd(data) {
    return ajax.post(`userServer/sysUser/resetPwd/${data}`);
}

// 操作日志

export function sysLogList(params) {
    return ajax.get('userServer/sysLog/list', params);
}