import man from "@plugins/man";
import {cloneDeep} from 'lodash';

/**
 *
 * getCollection 的默认配置
 *
 * @param dbName {String} 数据库名称
 * @param collection {String} 路径
 * @param user {Boolean} 区分用户
 * @param validator {Function} 数据校验钩子 返回 true 表示验证通过
 * @param defaultValue {*} 初始化默认值
 * @type {{defaultValue: string, dbName, validator: (function(): boolean), collection, user: boolean}}
 */
const defaultCfg = {
    dbName: process.env.VUE_APP_DB_NAME,
    collection: process.env.VUE_APP_DB_PATH,
    user: (Boolean(process.env.VUE_APP_DB_USER) === true),
    validator: (() => true),
    defaultValue: {}
};

/**
 * 集（集为空时会初始化）
 *
 * @param newCfg
 * @returns {string}
 */
function getCollection(newCfg) {
    const cfg = {...defaultCfg, ...newCfg};
    const uuid = man.cookies.get('uuid');
    const collection = `${cfg.user ? `user.${uuid}` : 'user.public'}${cfg.collection ? `.${cfg.collection}` : ''}`;
    const value = man.db.load(collection);
    // console.log(collection);
    // console.log(value);
    if (!(value !== undefined)) {
        man.db.save(collection, cfg.defaultValue);
    }
    return collection;
}

export default {
    namespaced: true,
    actions: {
        /**
         * 存值
         *
         * @param context
         * @param data
         * @param {String} data.dbName 数据库名称
         * @param {String} data.path 存储路径
         * @param {Boolean} data.user 是否区分用户
         * @param {*} data.value 需要存储的值
         */
        set(context, data) {
            man.db.save(getCollection(data), data.value);
        },

        /**
         * 读值
         *
         * @param context
         * @param data
         * @param {String} data.dbName 数据库名称
         * @param {String} data.path 存储路径
         * @param {Boolean} data.user 是否区分用户
         * @param {*} data.value 需要存储的值
         * @returns {Promise<unknown>}
         */
        get(context, data) {
            return new Promise(resolve => {
                resolve(cloneDeep(man.db.load(getCollection(data))));
            });
        }
    }
};