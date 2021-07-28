import * as common from './modules/common';
import * as auth from './modules/auth';
import * as personnel from './modules/personnel';
import * as form from './modules/form';

const api = {
    ...common,
    ...auth,
    ...personnel,
    ...form,
};

/*const files = require.context('./modules/', true, /\.js$/);
files.keys().forEach((key) => {
    Object.assign(api, files(key));
});*/

export default api;