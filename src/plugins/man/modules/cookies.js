import Vue from 'vue';
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

const cookies = {};
const cookiesPrefix = process.env.VUE_APP_NAME + '-' + process.env.VUE_APP_CODE;

/**
 * 存储 cookie 的值
 *
 * @param name cookie name
 * @param value cookie value
 * @param cfg cookie setting
 * @param cfg.time 1、直接设置数字：0，1，-1。设置为0即会话结束就删除cookie，设置1即一秒后删除，设置-1即此cookie永不删除，60 + 30即为1分30秒后，60*60即为1小时后，1就代表一秒
 * @param cfg.time 2.设置为字符串，比如："1s"即为一秒后删除、"2min"就是两分钟、"3h"就是3个小时、"4d"就是4天、"5m"就是5个月、"6y"就是6年
 * @param cfg.time 3.也可以自定义设置时间 比如：new Date(2019,9,13).toUTCString()
 */
cookies.set = function (name = 'default', value = '', cfg = {}) {
    cfg = {time: 0, ...cfg};
    Vue.$cookies.set(`${cookiesPrefix}-${name}`, JSON.stringify(value), cfg.time);
};

/**
 * 读取 cooike 的值
 *
 * @param name
 * @returns {*}
 */
cookies.get = function(name = 'default') {
    return Vue.$cookies.get(`${cookiesPrefix}-${name}`) ? JSON.parse(Vue.$cookies.get(`${cookiesPrefix}-${name}`)) : undefined;
};

/**
 * 判断是否存在某个键
 *
 * @param name
 * @returns {boolean}
 */
cookies.isKey = function(name = 'default') {
    return Vue.$cookies.isKey(name);
};

/**
 * 读取全部 cookie 的值
 */
cookies.getAllKeys = function() {
    return Vue.$cookies.keys();
}

/**
 * 删除 cookie
 *
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
    return Vue.$cookies.remove(`${cookiesPrefix}-${name}`);
};

export default cookies;

/*
import jsCookie from 'js-cookie';

const cookies = {};
const cookiesPrefix = process.env.VUE_APP_NAME + '-' + process.env.VUE_APP_CODE;

/!**
 * 存储 cookie 的值
 *
 * @param name cookie name
 * @param value cookie value
 * @param cfg cookie setting
 *!/
cookies.set = function (name = 'default', value = '', cfg = {}) {
    // let currentCfg = {expires: 1};
    let currentCfg = {};
    Object.assign(currentCfg, cfg);
    jsCookie.set(`${cookiesPrefix}-${name}`, JSON.stringify(value), currentCfg);
};

/!**
 * 读取 cooike 的值
 *
 * @param name
 * @returns {*}
 *!/
cookies.get = function(name = 'default') {
    return jsCookie.get(`${cookiesPrefix}-${name}`) ? JSON.parse(jsCookie.get(`${cookiesPrefix}-${name}`)) : undefined;
};

/!**
 * 读取全部 cookie 的值
 *!/
cookies.getAll = function() {
    return jsCookie.get();
}

/!**
 * 删除 cookie
 *
 * @param {String} name cookie name
 *!/
cookies.remove = function (name = 'default') {
    return jsCookie.remove(`${cookiesPrefix}-${name}`);
};

export default cookies;
*/