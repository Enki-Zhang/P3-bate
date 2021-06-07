import ajax from "@plugins/ajax";

// 角色管理

export function menuList(params) {
    return ajax.get('userServer/menu/list', params);
}
export function sysRoleList(params) {
    return ajax.get('userServer/sysRole/list', params);
}
export function sysRoleFind(params) {
    return ajax.get(`userServer/sysRole/find/${params}`);
}
export function sysRoleEdit(data) {
    return ajax.post('userServer/sysRole/edit', data);
}

// 部门管理

export function departmentSelect(params) {
    return ajax.get('userServer/department/select', params);
}
export function departmentList(params) {
    return ajax.get('userServer/department/list', params);
}
export function departmentSave(data) {
    return ajax.post('userServer/department/save', data);
}
export function departmentFind(params) {
    return ajax.get(`userServer/department/find/${params}`);
}
export function departmentEdit(data) {
    return ajax.post('userServer/department/edit', data);
}
export function departmentDel(data) {
    return ajax.post(`userServer/department/del/${data}`);
}

// 后台帐号管理

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