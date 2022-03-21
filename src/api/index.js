import * as common from './modules/common';
import * as auth from './modules/auth';
import * as workbench from './modules/workbench';
import * as systemDoc from './modules/systemDoc';
import * as personnel from './modules/personnel';
import * as form from './modules/form';
import * as settings from './modules/settings';
import * as activity from './modules/activity';

const api = {
    ...common,
    ...auth,
    ...workbench,
    ...systemDoc,
    ...personnel,
    ...form,
    ...settings,
    ...activity
};

/*const files = require.context('./modules/', true, /\.js$/);
files.keys().forEach((key) => {
    Object.assign(api, files(key));
});*/

export default api;