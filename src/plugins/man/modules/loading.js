import bus from './bus';

const loading = {};
const eventName = 'openFullScreen';
const options = {
    lock: true,
    // text: 'Loading',
    // spinner: 'el-icon-loading',
    // background: 'rgba(0, 0, 0, 0.7)'
};

/**
 * 打开全屏加载
 * @param show
 * @param closeWaitingTimer
 * @param options
 */
loading.openFullScreen = function(show = true, closeWaitingTimer = 128, options = options) {
    bus.$emit(eventName, {
        show,
        closeWaitingTimer,
        options
    });
};

/**
 * 关闭全屏加载
 * @param closeWaitingTimer
 */
loading.closeFullScreen = function(closeWaitingTimer = 128) {
    bus.$emit(eventName, {
        show: false,
        closeWaitingTimer
    });
};

export default loading;