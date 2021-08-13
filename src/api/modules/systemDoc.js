import ajax from "@plugins/ajax";

// 生物安全实验室管理体系文件

// 体系文件类型

export function systemDocumentTypePage(params) {
    return ajax.get('backServer/systemDocumentType/page', params);
}
export function systemDocumentTypeFindById(params) {
    return ajax.get(`backServer/systemDocumentType/findById/${params}`);
}
export function systemDocumentTypeSave(data) {
    return ajax.post('backServer/systemDocumentType/save', data);
}
export function systemDocumentTypeUpdate(data) {
    return ajax.post('backServer/systemDocumentType/update', data);
}
export function systemDocumentTypeDelete(data) {
    return ajax.post(`backServer/systemDocumentType/delete/${data}`);
}

// 体系文件列表

export function systemDocumentPage(params) {
    return ajax.get('backServer/systemDocument/page', params);
}
export function systemDocumentList(params) {
    return ajax.get('backServer/systemDocument/list', params);
}
export function systemDocumentSave(data) {
    return ajax.post('backServer/systemDocument/save', data);
}
export function systemDocumentUpdate(data) {
    return ajax.post('backServer/systemDocument/update', data);
}
export function systemDocumentPageDocumentById(params) {
    return ajax.get('backServer/systemDocument/pageDocumentById', params);
}
export function customFormListByDocumentId(params) {
    return ajax.get('userServer/customForm/listByDocumentId', params);
}
export function customFormAll(params) {
    return ajax.get('userServer/customForm/all', params);
}


// 版本

export function systemDocumentVersions(params) {
    return ajax.get(`backServer/systemDocument/versions`, params);
}
export function systemDocumentSetManVersion(data) {
    return ajax.post('backServer/systemDocument/setMainVersion', data);
}

// 查阅

export function systemDocumentFindById(params) {
    return ajax.get(`backServer/systemDocument/findById/${params}`);
}
export function customFormInfoSave(data) {
    return ajax.post('userServer/customFormInfo/save', data);
}

// 删除

export function systemDocumentDelete(data) {
    return ajax.post(`backServer/systemDocument/delete/${data}`);
}