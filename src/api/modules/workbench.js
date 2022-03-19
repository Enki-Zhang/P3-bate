import ajax from "@plugins/ajax";

// 待我审批

export function camundaTaskWaitForMyAuditPage(params) {
    return ajax.get(`backServer/camunda/task/waitForMyAudit/page`, params);
}


// 更新中

/*export function camundaTaskCandidateUser(params) {
    return ajax.get(`backServer/camunda/task/candidateUser`, params);
}*/


// 办理中

export function camundaTaskStartedByMePage(params) {
    return ajax.get(`backServer/camunda/task/startedByMe/page`, params);
}


// 申请历史记录

export function camundaHistoryStartedByMePage(params) {
    return ajax.get(`backServer/camunda/history/startedByMe/page`, params);
}







