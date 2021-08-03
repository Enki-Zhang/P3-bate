import ajax from "@plugins/ajax";


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