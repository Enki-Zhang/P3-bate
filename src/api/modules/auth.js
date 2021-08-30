import ajax from "@plugins/ajax";

/**
 * 获取图形验证码
 * @param params
 * @returns {void|*}
 */
export function securityImgcode(params) {
    return ajax.get(`ssoServer/security/imgcode/${params}`);
}

/**
 * 登录
 * @param data
 * @returns {void|*}
 */
export function securityTokenAdmin(data) {
    return ajax.post('ssoServer/security/tokenAdmin', data);
}

/**
 * 修改密码
 * @param data
 * @returns {*}
 */
export function updatePwdAdmin(data) {
    return ajax.post('userServer/updatePwdAdmin', data);
}

/**
 * 退出登录
 * @param data
 * @returns {*}
 */
export function securityClear(data) {
    return ajax.post('ssoServer/security/clear', data);
}
