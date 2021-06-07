import ajax from "@plugins/ajax";

// 修改密码

export function updatePwdAdmin(data) {
    return ajax.post('userServer/updatePwdAdmin', data);
}