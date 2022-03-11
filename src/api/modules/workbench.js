import ajax from "@plugins/ajax";

// 待我审批

export function camundaTaskCandidateUser(params) {
    return ajax.get(`backServer/camunda/task/candidateUser`, params);
}


// 办理中

export function camundaProcessInstanceStartedByUserId(params) {
    return ajax.get(`backServer/camunda/processInstance/startedByUserId`, params);
}


// 更新中

/*export function camundaTaskCandidateUser(params) {
    return ajax.get(`backServer/camunda/task/candidateUser`, params);
}*/


// 申请历史记录

export function camundaHistoryStartedByUserId(params) {
    return ajax.get(`backServer/camunda/history/startedByUserId`, params);
}







