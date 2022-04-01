import ajax from "@plugins/ajax";

// 待我审批

export function workbenchRunningWaitForMyAuditPage(params) {
    return ajax.get(`backServer/workbench/running/waitForMyAudit/page`, params);
}
export function camundaFindByProcessInstanceId(params) {
    return ajax.get(`backServer/camunda/findByProcessInstanceId/${params}`);
}
export function camundaComplete(data) {
    return ajax.post(`backServer/camunda/complete`, data);
}


// 更新中

export function workbenchUpdateInfoPage(params) {
    return ajax.get(`backServer/workbench/updateInfo/page`, params);
}


// 办理中

export function workbenchRnningStartedByMePage(params) {
    return ajax.get(`backServer/workbench/running/startedByMe/page`, params);
}
export function workbenchGetDetail(params) {
    return ajax.get(`backServer/workbench/getDetail/${params}`);
}


// 申请历史记录

export function workbenchHistoryStartedByMePage(params) {
    return ajax.get(`backServer/workbench/history/startedByMe/page`, params);
}







