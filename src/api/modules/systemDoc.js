import ajax from "@plugins/ajax";

// 生物安全实验室管理体系文件

export function systemDocumentPage(params) {
    return ajax.get('backServer/systemDocument/page', params);
}

// 版本

export function systemDocumentVersions(params) {
    return ajax.get(`backServer/systemDocument/versions`, params);
}

// 查阅

export function systemDocumentFindById(params) {
    return ajax.get(`backServer/systemDocument/findById`, params);
}

// 删除

export function systemDocumentDelete(data) {
    return ajax.post('backServer/systemDocument/delete', data);
}