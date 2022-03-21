import ajax from "@plugins/ajax";

/**
 * 获取课题组列表
 */
export function lessionGroupList(params) { 
    return ajax.get(`userServer/topicGroup/page`,params);
}

/**
 * 新增课题组
 */
export function lessionGroupAdd(params) { 
    return ajax.post(`userServer/topicGroup/create`,params);
}

/**
 * 修改课题组
 */
export function lessionGroupEdit(params) { 
    return ajax.post(`userServer/topicGroup/update`,params);
}


/**
 * 删除课题组
 */
export function lessionGroupDel(id) { 
    return ajax.post(`userServer/topicGroup/delete/${id}`,null);
}
