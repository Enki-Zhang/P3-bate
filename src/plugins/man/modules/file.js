const file = {};

/**
 * base64 转图片文件
 *
 * @param dataUrl
 * @param name
 * @returns {File} 文件
 */
file.base64ToFile = function(dataUrl, name = 'file') {
    const dataUrlConArr = dataUrl.split(',');
    const mime = dataUrlConArr[0].match(/:(.*?);/)[1];
    const suffix = mime.split('/')[1];
    const bstr = atob(dataUrlConArr[1]);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {u8arr[n] = bstr.charCodeAt(n);}

    return new File([u8arr], `${name}.${suffix}`, {type: mime});
};

/**
 * blob 格式转 base64
 *
 * @param blob
 * @param callback 回调
 */
file.blobToBase64 = function(blob, callback) {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function(e) {
        callback(e.target.result);
    }
};

/**
 * 二进制转 base64
 *
 * @param buffer
 * @returns {string}
 */
file.arrayBufferToBase64 = function(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for(let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

/**
 * blob 流转成文件下载
 *
 * @param originRes 源接口返回对象
 * @param name 文件名
 * @param ext 文件后缀
 * @param hasTimestamp 是否带有时间戳，默认为：是
 */
file.blobAsFile = function(originRes, name = false, ext = false, hasTimestamp = true) {
    if(originRes.headers !== undefined && !!originRes.headers['content-disposition']) {
        let contentDisposition = originRes.headers['content-disposition'].replace(/"|'/g, '');
        let fileNameStr = contentDisposition.split(';')[1].split('filename=')[1];
        let fileNameArr = fileNameStr.split('.');
        let extOrigin = fileNameArr[fileNameArr.length - 1];
        let nameOrigin = fileNameStr.split(`.${extOrigin}`)[0];
        name = name ? name : nameOrigin;
        ext = ext ? ext : extOrigin;
    } else if(name === false || ext === false) return false;

    // 创建 BLOB
    originRes = originRes instanceof Blob ? {data: originRes} : originRes;
    let blob = new Blob([originRes.data]);
    let now = new Date();
    let fileName = hasTimestamp
        ? `${name}_${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.${ext}`
        : `${name}.${ext}`;

    // 非 IE 下载
    if ('download' in document.createElement('a')) {
        let alink = document.createElement('a');
        alink.download = fileName;
        alink.style.display = 'none';
        alink.href = URL.createObjectURL(blob);
        document.body.appendChild(alink);
        alink.click();
        // 释放 URL 对象
        URL.revokeObjectURL(alink.href);
        document.body.removeChild(alink);
    }
    // IE10+下载
    else {navigator.msSaveBlob(blob, fileName);}
};

export default file;