import axios from 'axios';
import qs from 'qs';
import man from "@plugins/man";
import {Message, MessageBox} from "element-ui";
import store from '@/store';

// 初始化全局配置并创建实例
const cfg = {
    baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API : '/api',
    timeout: 3600000,
    withCredentials: false,
};
const instance = axios.create(cfg);

// 请求拦截器
instance.interceptors.request.use(config => {
    // 附带 token
    if (!(/^https:\/\/|http:\/\//.test(config.url))) {
        const token = man.cookies.get('token');
        const webSite = man.db.load('sys.webSite');
        if (token && token !== 'undefined') {
            // 请求附带 token，即 ['Authorization'] 为 Bearer + token
            config.headers['Authorization'] = 'Bearer ' + token;
            config.headers['Token'] = token;
            // 登录后附带当前站点标识（1：主站，2：教育站）
            config.headers['Web-Site'] = webSite;
        }
    }
    return config;
}, error => {
    // 请求错误
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(response => {
    // 正常响应
    // console.log(response);
    /*if(response.headers.authorization !== undefined || response.headers.Authorization !== undefined) {
        let token = response.headers.authorization || response.headers.Authorization;
        let tokenArr = token.split(' ');
        store.dispatch('user/setToken', (tokenArr.length > 1 ? tokenArr[1] : token));
    }*/
    if(response.data.status !== undefined && response.data.status !== 200) {
        switch (response.data.status) {
            case 106:
                if(response.config.url !== 'auth/login') {
                    if(process.env.NODE_ENV === 'production') {
                        Message({type: 'error', message: '操作失败：身份信息失效，请重新登录'});
                        store.dispatch('reLogin');
                        setTimeout(function() {
                            location.reload();
                        }, 888);
                    } else {
                        MessageBox.confirm('是否重新登录', '确认信息', {
                            distinguishCancelAndClose: true,
                            confirmButtonText: '重新登录',
                            cancelButtonText: '取消'
                        }).then(() => {
                            Message({type: 'error', message: '操作失败：身份信息失效，请重新登录'});
                            store.dispatch('reLogin');
                            setTimeout(function() {
                                location.reload();
                            }, 888);
                        }).catch();
                    }
                } else {
                    Message({type: 'error', message: '登录失败！帐号或密码错误'});
                }
                break;
            default:
                Message({type: 'error', message: `${response.data.message}`});
                break;
        }
    }
    return response;
}, error => {
    // 错误响应
    Message({type: 'error', message: `操作失败：${error.message}`});
    return Promise.reject(error);
});

/**
 * axios 常用请求方式封装
 *
 * @type {{}}
 */
const ajax = {};

/**
 * get 请求
 *
 * @param url
 * @param params
 * @param authorityVerification
 * @param cfg
 * @returns {*}
 */
ajax.get = function(url, params = {}, authorityVerification = true, ...cfg) {
    return instance({
        url,
        params,
        method: 'get',
        authorityVerification,
        ...cfg
    });
};

/**
 * get 请求，返回值为 blob 类型
 *
 * @param url
 * @param params
 * @param authorityVerification
 * @param cfg
 * @returns {*}
 */
ajax.getBlob = function(url, params = {}, authorityVerification = true, ...cfg) {
    return instance({
        url,
        params,
        method: 'get',
        responseType: 'blob',
        authorityVerification,
        ...cfg
    });
};

/**
 * post 请求
 *
 * @param url
 * @param data
 * @param authorityVerification
 * @param cfg
 * @returns {*}
 */
ajax.post = function(url, data = {}, authorityVerification = true, ...cfg) {
    return instance({
        url,
        data,
        method: 'post',
        authorityVerification,
        ...cfg
    });
};

/**
 * post 请求（form）
 *
 * @param url
 * @param data
 * @param authorityVerification
 * @param cfg
 * @returns {*}
 */
ajax.postForm = function(url, data = {}, authorityVerification = true, ...cfg) {
    return instance({
        url: url,
        method: 'post',
        data: qs.stringify(data),
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        ...cfg
    });
};

/**
 * 文件上传
 *
 * @param url
 * @param data
 * @param needFormat 是否格式化为 FormData
 * @param authorityVerification
 * @param cfg
 * @returns {*}
 */
ajax.upload = function(url, data, needFormat = true, authorityVerification = true, ...cfg) {
    let formData;
    if(needFormat) {
        formData = new FormData();
        formData.append('file', data);
    } else {
        formData = data;
    }

    return instance({
        url,
        data: formData,
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        authorityVerification,
        ...cfg
    });
};

/**
 * 多请求全部执行完成才同步返回
 *
 * @param requests axios 实例数组
 * @returns {*}
 */
ajax.all = function(requests = []) {
    return instance.all(requests);
};

/**
 * 原实例
 *
 * @param options
 * @returns {*}
 */
ajax.axios = function(options) {
    return axios.create({
        ...cfg,
        ...options
    });
};

export default ajax;
