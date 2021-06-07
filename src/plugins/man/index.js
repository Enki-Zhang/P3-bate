import bus from './modules/bus';
import cookies from './modules/cookies';
import db from './modules/db';
import datetime from './modules/datetime';
import rsa from './modules/rsa';
import loading from './modules/loading';
import file from './modules/file';
import cfg from "./modules/cfg";
import fast from "./modules/fast";
import test from "./modules/test";

const man = {
    bus,
    cookies,
    db,
    datetime,
    rsa,
    loading,
    file,
    cfg,
    fast,
    test,
};

/**
 * 防抖
 * @param fn 目标函数名称
 * @param waiting 延迟执行毫秒数
 * @param isImmediate 是否立即执行，默认为 true
 * @returns {function(...[*]=)}
 */
man.debounce = function(fn, waiting = 1000, isImmediate = true) {
    let timer;
    return function() {
        let that = this,
            args = arguments; // arguments 中存着 e
        if(timer) clearTimeout(timer);
        if(isImmediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, waiting);
            if(callNow) fn.apply(that, args);
        } else {
            timer = setTimeout(() => {
                fn.apply();
            }, waiting);
        }
    };
};

/**
 * 节流
 * @param fn 目标函数
 * @param waiting 延迟执行毫秒数
 * @param type 1：时间戳 2：定时器
 * @returns {function(...[*]=)}
 */
man.throttle = function(fn, waiting, type) {
    let previous, timeout;
    if (type === 1) {
        previous = 0;
    } else if (type === 2) {
        timeout;
    }
    return function () {
        let that = this;
        let args = arguments;
        if (type === 1) {
            let now = Date.now();

            if (now - previous > waiting) {
                fn.apply(that, args);
                previous = now;
            }
        } else if (type === 2) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    fn.apply(that, args);
                }, waiting);
            }
        }
    }
};

export default man;