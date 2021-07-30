import * as common from './modules/common';
import * as auth from './modules/auth';
import * as personnel from './modules/personnel';
import * as form from './modules/form';
import * as settings from './modules/settings';

const api = {
    ...common,
    ...auth,
    ...personnel,
    ...form,
    ...settings,
};

/*const files = require.context('./modules/', true, /\.js$/);
files.keys().forEach((key) => {
    Object.assign(api, files(key));
});*/

export default api;