import NodeRSA from 'node-rsa';
import keys from '@assets/rsa-keys';

/**
 * RSA 密钥
 * @description 依赖包：npm install node-rsa --save
 * @description 默认：公钥加密，私钥解密
 * @description 默认：公钥验签，秘钥签名
 * @description 默认：密钥文件存放于 assets/rsa-keys 目录下；命名风格推荐：rsa_公/私_key.pem、平台_rsa_公/私_key.pem
 */
const rsa = {};
const keyFormatPublic = 'public';
const keyFormatPrivate = 'pkcs1-private-pem';
const keyTypePublic = 'public-key';
const keyTypePrivate = 'private-key';

rsa.encrypt = function(needEncrypt, keyOrPlatform = 'api') {
    let key = rsa.initKey(keyOrPlatform, keyTypePublic);
    return key.encrypt(JSON.stringify(needEncrypt), 'base64', 'utf8');
}

/**
 * 解密
 * @param needDecrypt
 * @param keyOrPlatform
 * @returns {any}
 */
rsa.decrypt = function(needDecrypt, keyOrPlatform = 'rsa-private') {
    let key = rsa.initKey(keyOrPlatform, keyTypePrivate);
    let decrypted = key.decrypt(needDecrypt, 'utf8');
    return decrypted ? JSON.parse(decrypted) : null;
}

/**
 * 初始化密钥
 * @param keyOrPlatform
 * @param keyType
 * @returns {NodeRSA}
 */
rsa.initKey = function(keyOrPlatform, keyType) {
    let key = new NodeRSA();
    let keyContent;

    switch (keyOrPlatform) {
        case 'rsa-private':
            keyContent = keys.private_key;
            break;
        case 'api':
            keyContent = keys.api_public_key;
            break;
        default:
            keyContent = keyOrPlatform;
            break;
    }
    keyContent = rsa.formatKey(keyContent, keyType);

    switch (keyType) {
        case keyTypePublic:
            key.importKey(keyContent, keyFormatPublic);
            break;
        case keyTypePrivate:
            key.importKey(keyContent, keyFormatPrivate);
            break;
    }

    return key;
}

/**
 * 格式化密钥内容
 * @param key
 * @param keyType 'public-key' or 'private-key'
 * @returns {string|*}
 */
rsa.formatKey = function(key, keyType) {
    key = key.replace(/\n/g, '');

    switch (keyType) {
        case keyTypePublic:
            key = key.replace('-----BEGIN PUBLIC KEY-----', '');
            key = key.replace('-----END PUBLIC KEY-----', '');
            key = key.replace(/ /g, '');
            return key;
        case keyTypePrivate:
            key = key.replace('-----BEGIN RSA PRIVATE KEY-----', '');
            key = key.replace('-----END RSA PRIVATE KEY-----', '');
            key = key.replace(/ /g, '');
            let tmp = '';
            for(let i = 0; i < key.length; i += 64) {
                tmp += key.substr(i, 64).toString() + '\n';
            }
            return '-----BEGIN RSA PRIVATE KEY-----\n' + tmp + '-----END RSA PRIVATE KEY-----';
    }
}

/**
 * 生成公钥、私钥
 *
 * @param b 密钥长度，默认 2048，其他值：1024
 * @returns {{privateKey: *, publicKey: *}}
 */
rsa.generateKey = function(b = 2048) {
    b = b === 2048 ? b : 1024;
    let key = new NodeRSA({b: 2048});
    return {
        publicKey: key.exportKey(keyFormatPublic),
        privateKey: key.exportKey(keyFormatPrivate)
    };
}

export default rsa;

