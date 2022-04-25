import ajax from "@plugins/ajax";

export function all(apiArr = []) {
    return ajax.all(apiArr);
}


/**
 * 文件上传
 *
 * @param data
 * @param needFormat
 * @returns {*|void}
 */
export function upload(data, needFormat) {
    return ajax.upload('/backServer/file/uploadFile', data, needFormat);
}

/**
 * base64 上传
 *
 * @param data
 * @returns {*|void}
 */
export function uploadBase64(data) {
    return ajax.upload('/backServer/file/base64/uploadFile', data);
}

/**
 * 删除上传的文件
 *
 * @param data
 * @returns {*}
 */
export function deleteUploadFile(data) {
    return ajax.post('backServer/file/del', data);
}

/**
 * 测试 ajax
 *
 * @param params
 * @returns {*|void}
 */
export function testAjax(params) {
    switch (params.methodType) {
        case 'get':
            return ajax.get('test/ajax', params);
        case 'post':
            return ajax.post('test/ajax', params);
    }
}

/**
 * 测试 ajax 模拟延迟
 *
 * @param params
 * @returns {*|void}
 */
export function testAjaxSleep(params) {
    switch (params.methodType) {
        case 'get':
            return ajax.get('test/ajax/sleep', params);
        case 'post':
            return ajax.post('test/ajax/sleep', params);
    }
}


/**
 * 获取菜单下级按钮
 * @param name
 * @returns {void|*}
 */
export function getMenuBtn(params) {
    return ajax.get(`userServer/menu/btn`,params);
}

/**
 * 获取表单信息
 * @param id
 * @returns {void|*}
 */
export function getFormInfo(id) {
    return ajax.get(`userServer/customForm/find/${id}`,null);
}

/**
 * 获取表单表头
 * @param menuId
 * @returns {void|*}
 */
export function getFormHead(menuId) {
    return ajax.get(`userServer/dynamicForm/getTableHeads/${menuId}`,null);
}

/**
 * 获取已填写表单记录
 * @param menuId,pageCurrent,pageSize
 * @returns {void|*}
 */
export function getFormRecord(params) {
    return ajax.post(`userServer/dynamicForm/showTable`,params);
}
