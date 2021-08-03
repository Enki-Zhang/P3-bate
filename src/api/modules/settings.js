import ajax from "@plugins/ajax";

// 菜单管理

export function menuList(params) {
    return ajax.get('userServer/menu/list', params);
}
export function menuFind(params) {
    return ajax.get(`userServer/menu/find/${params}`);
}
export function menuEdit(data) {
    return ajax.post('userServer/menu/edit', data);
}