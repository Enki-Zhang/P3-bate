import ajax from "@plugins/ajax";

// 菜单管理

export function menuList(params) {
    return ajax.get('userServer/menu/list', params);
}
export function menuFind(params) {
    return ajax.get(`userServer/menu/find/${params}`);
}
export function menuFindMenuFormConfigById(params) {
    return ajax.get(`userServer/menu/findMenuFormConfigById/${params}`);
}
export function customFormSelect(params) {
    return ajax.get(`userServer/customForm/select`, params);
}
export function customFormFindList(params) {
    return ajax.get(`userServer/customForm/findList/${params}`);
}
export function menuEdit(data) {
    return ajax.post('userServer/menu/edit', data);
}