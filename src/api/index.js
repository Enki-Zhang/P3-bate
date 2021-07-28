import * as common from './modules/common';
import * as auth from './modules/auth';
import * as personnel from './modules/personnel';

const api = {
    ...common,
    ...auth,
    ...personnel,
};

/*const files = require.context('./modules/', true, /\.js$/);
files.keys().forEach((key) => {
    Object.assign(api, files(key));
});*/

export default api;