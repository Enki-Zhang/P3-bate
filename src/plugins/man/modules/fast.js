const fast = {};

/**
 * 获取资源地址
 *
 * @param relPath 资源相对路径
 * @param mergeType 拼接类型
 * @returns {string}
 */
fast.getResourcePath = function(relPath = '', mergeType = 0) {
    let domainAndHost = '';
    switch (process.env.NODE_ENV) {
        case 'development':
            domainAndHost = process.env.VUE_APP_RESOURCE_HOST;
            break;
        case 'production':
            domainAndHost = `${window.location.origin}${process.env.VUE_APP_API}`;
            break;
    }
    let prefix = '';
    switch (mergeType) {
        case 0:
            prefix = `backServer/resources/`;
            break;
        case 1:
            prefix = `userServer/resources/`;
            break;
    }
    return `${domainAndHost}${prefix}${relPath}`;
};

/**
 * 浏览器操作系统是否是 PC 端
 *
 * @returns {boolean}
 */
fast.browserSystemIsPC = function() {
    let browserSystem = window.navigator.userAgent
        .toLowerCase()
        .split('(')[1]
        .split(';')[0];
    return browserSystem.search(/windows/) === 0 || browserSystem.search(/macintosh/) === 0;
};

/**
 * 获取文档高度
 *
 * @returns {number}
 */
fast.getScreenHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};

/**
 * 数组三明治转对象
 *
 * @param data 源数组
 * @param span 跨度
 * @param isJsonStringify 结果是否格式化 json
 * @returns {any}
 */
fast.arraySandwichToObject = function(data = [], span = 1, isJsonStringify = false) {
    let res = {};

    data.map((v, k) => {
        if(k === 0 || k % 2 === 0) {
            res[v] = typeof data[k + span] === 'number' ? Number(data[k + span]) : data[k + span];
        }
    });

    return isJsonStringify ? JSON.stringify(res) : res;
};

/**
 * 判断字符串是否存在数组中
 *
 * @param search
 * @param data
 * @returns {boolean}
 */
fast.inArray = function(search = '', data = []) {
    let res = false;

    data.map(v => {
        if(v === search) {
            res = true;
            return res;
        }
    });

    return res;
};

/**
 * 生成 uuid
 *
 * @returns {string}
 */
fast.getUUID = function() {
    let s = [],
        hexDigits = "0123456789abcdef";

    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
};

/**
 * 随机数
 * @param min
 * @param max
 * @returns {number}
 */
fast.getRandom = function(min = 1000, max = 9999) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * 时间戳附带随机数
 * @param min
 * @param max
 * @returns {string}
 */
fast.getRandomJoinTimestamp = function(min = 1000, max = 9999) {
    return `${new Date().getTime()}${Math.floor(Math.random() * (max - min + 1) + min)}`;
};

export default fast;