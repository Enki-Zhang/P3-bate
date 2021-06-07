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