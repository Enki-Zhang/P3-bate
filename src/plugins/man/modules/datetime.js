const datetime = {};

/**
 * 获取当前时间戳（PHP版，10位，精确到秒）
 *
 * @returns {number}
 */
datetime.time = function() {
    return Number((new Date()).getTime().toString().substr(0, 10));
};

/**
 * 获取当前时间戳（13位，精确到毫秒）
 *
 * @returns {number}
 */
datetime.timestamp = function() {
    return (new Date()).getTime();
};

export default datetime;
