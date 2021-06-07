import low from 'lowdb';
// import FileSync from 'lowdb/adapters/FileSync';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage(`${process.env.VUE_APP_NAME}`);
const db = low(adapter);
let structure = {};
process.env.VUE_APP_DB_DEFAULT_STRUCTURE.split(',').map(v => {
    structure[v] = {};
});
db.defaults(structure).write();

/**
 * 快捷 - 读取
 * @param k
 * @returns {*}
 */
db.load = function(k) {
    return db.get(k).value();
};

/**
 * 快捷 - 保存
 * @param k
 * @param v
 */
db.save = function(k, v) {
    db.set(k, v).write();
};

/**
 * 快捷 - 移除属性
 * @param k
 */
db.removeAttr = function(k) {
    db.get(k).remove().write();
};

/**
 * 快捷 - 删除
 * @param k
 */
db.remove = function(k) {
    db.unset(k).write();
};

export default db;