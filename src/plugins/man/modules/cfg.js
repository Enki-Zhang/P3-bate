import man from "@plugins/man";

const cfg = {};

/**
 * 百度富文本编辑器初始配置
 * @param serverUrl
 * @param isSplice 是否拼接
 * @returns {{initialFrameHeight: number, initialFrameWidth: string, autoFloatEnabled: boolean, serverUrl: string, UEDITOR_HOME_URL: string, autoHeightEnabled: boolean, zIndex: number}}
 */
cfg.ueditor = function(serverUrl = 'http://35.201.165.105:8000/controller.php', isSplice = false) {
    if(isSplice) {
        switch (process.env.NODE_ENV) {
            case 'development':
                serverUrl = `${window.location.origin}/api/${serverUrl}`;
                break;
            case 'production':
                serverUrl = `${window.location.origin}${process.env.VUE_APP_API}${serverUrl}`;
                break;
        }
    }
    return {
        UEDITOR_HOME_URL: `${process.env.VUE_APP_ROUTE_BASE}UEditor/`,
        // serverUrl: `http://192.168.10.214:18801/ueditor/upload`,
        // serverUrl: `${serverUrl}?token=${encodeURI(man.cookies.get('token'))}`,
        serverUrl: `${serverUrl}`,
        // serverUrl,
        zIndex: 776,
        initialFrameWidth: '100%',
        autoHeightEnabled: false,
        initialFrameHeight: 180,
        autoFloatEnabled: false,
    };
};

/**
 * 图像裁剪组件的基本配置
 *
 * @param imageUrl 图片路径
 * @param options 其他设置
 * @returns {{img: string, original: boolean, autoCrop: boolean, originFileName: string, canMoveBox: boolean, centerBox: boolean, infoTrue: boolean, outputType: string, fixedNumber: number[], autoCropWidth: number, outputSize: number, autoCropHeight: number, fixed: boolean, fixedBox: boolean, info: boolean, canScale: boolean, full: boolean}}
 */
cfg.vueCropper = function(imageUrl = '', options = {}) {
    return {
        img: imageUrl,
        info: true,
        outputSize: 0.8,
        outputType: 'jpeg',
        canScale: true,
        autoCrop: true,
        autoCropWidth: 100,
        autoCropHeight: 100,
        fixedBox: false,
        fixed: true,
        fixedNumber: [1, 1],
        full: false,
        canMoveBox: false,
        original: true,
        centerBox: false,
        infoTrue: false,
        originFileName: 'cropped',
        openLocal: true,
        ...options
    };
};

export default cfg;