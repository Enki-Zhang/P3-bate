import ajax from "@plugins/ajax";

// 课程管理

export function courseList(params) {
    return ajax.get('userServer/course/list', params);
}
export function courseFind(params) {
    return ajax.get(`userServer/course/find/${params}`);
}
export function courseEdit(data) {
    return ajax.post(`userServer/course/edit`, data);
}
export function courseDel(data) {
    return ajax.post(`userServer/course/del/${data}`);
}
export function courseFindCourseware(params) {
    return ajax.get(`userServer/course/findCourseware`, params);
}
export function courseStudentBind(data) {
    return ajax.post(`userServer/course/student/bind`, data);
}
export function courseStudentUnBind(data) {
    return ajax.post(`userServer/course/student/unbind`, data);
}
export function courseStudentBindList(params) {
    return ajax.get('userServer/course/student/bindList', params);
}
export function courseStudentUnBindList(params) {
    return ajax.get('userServer/course/student/unbindList', params);
}
export function courseCommentList(params) {
    return ajax.get('userServer/comment/list', params);
}
export function courseCommentFind(params) {
    return ajax.get(`userServer/comment/find/${params}`);
}
export function courseCommentEdit(data) {
    return ajax.post('userServer/comment/edit', data);
}
export function courseCommentDel(data) {
    return ajax.post(`userServer/comment/del/${data}`);
}
export function fileCoverUpload(data) {
    return ajax.upload('userServer/file/cover/upload', data);
}

// 课件管理

export function coursewareList(params) {
    return ajax.get('userServer/courseware/list', params);
}
export function coursewareFind(params) {
    return ajax.get(`userServer/courseware/find/${params}`);
}
export function coursewareEdit(data) {
    return ajax.post(`userServer/courseware/edit`, data);
}
export function coursewareDel(data) {
    return ajax.post(`userServer/courseware/del/${data}`);
}
export function fileCoursewarePreviewText(params) {
    return ajax.get(`userServer/file/courseware/previewText/${params}`);
}
export function fileCoursewarePreviewTextStream(params) {
    return ajax.get(`userServer/file/courseware/previewTextStream/${params}`);
}
export function fileCoursewarePreviewVideo(params) {
    return ajax.get(`userServer/file/courseware/previewVideo/${params}`);
}
export function fileCoursewarePreviewVideoStream(params) {
    return ajax.get(`userServer/file/courseware/previewVideoStream/${params}`);
}
export function coursewareSoldOut(data) {
    return ajax.post(`userServer/courseware/soldOut`, data);
}

// 作品管理

export function opusList(params) {
    return ajax.get('userServer/opus/list', params);
}
export function opusFind(params) {
    return ajax.get(`userServer/opus/find/${params}`);
}
export function opusEdit(data) {
    return ajax.post('userServer/opus/edit', data);
}
export function opusDel(data) {
    return ajax.post(`userServer/opus/del/${data}`);
}
export function opusPreview(params) {
    return ajax.get(`userServer/opus/preview/${params}`);
}

// 订单管理

export function orderList(params) {
    return ajax.get(`userServer/order/list`, params);
}
export function orderFind(params) {
    return ajax.get(`userServer/order/find/${params}`);
}
export function orderDetail(data) {
    return ajax.post(`userServer/order/detail`, data);
}
