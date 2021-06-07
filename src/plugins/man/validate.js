/**
 * 验证内容是否全为空格
 * @param rule
 * @param value
 * @param callback
 */
export const validateAllSpace = (rule, value, callback) => {
    let reg = /^[ ]*$/;
    if (!!reg.test(value)) {
        callback(new Error());
    } else {callback();}
};

/**
 * 验证手机号码
 * @param rule
 * @param value
 * @param callback
 */
export const validatePhone = (rule, value, callback) => {
    let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if (!(reg.test(value))) {
        callback(new Error());
    } else {callback();}
};

/**
 * 验证电话号码（固话）
 * @param rule
 * @param value
 * @param callback
 */
export const validateTel = (rule, value, callback) => {
    // let reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
    let reg = /^(\d{1,4}-)?(\d{1,4}-)?\d{7,9}$/;
    if (!(reg.test(value))) {
        callback(new Error());
    } else {callback();}
};

/**
 * 验证是否上传附件
 * @param rule
 * @param value
 * @param callback
 */
export const validateAnnex = (rule, value, callback) => {
    if (!value) {
        callback(new Error());
    } else {callback();}
};

/**
 * 验证两次输入的密码是否一致
 * @param rule
 * @param value
 * @param callback
 * @param newPwd
 */
export const validateTwicePassword = (rule, value, callback, newPwd) => {
    if(value !== newPwd) {
        callback(new Error());
    } else {callback();}
};

/**
 * 验证是否为空数组
 * @param rule
 * @param value
 * @param callback
 */
export const validateNullArray = (rule, value, callback) => {
    if(typeof value !== 'object' || value.length < 1) {
        callback(new Error());
    } else {callback();}
};

/**
 * 根据类型判断金额（自定义验证不写在改文件内）
 * @param rule
 * @param value
 * @param callback
 * @param type
 */
/*export const validateMoneyByType = function(rule, value, callback, type) {
    let min = 0, max = 99999999;
    switch (type) {
        case '传统燃油汽车':
            min = 50000;
            max = 180000;
            break;
        case '新能源汽车':
            min = 70000;
            max = 200000;
            break;
    }
    if(value < min || value > max) {
        callback(new Error());
    } else {
        callback();
    }
};*/

