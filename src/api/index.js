import * as common from './modules/common';
import * as auth from './modules/auth';
import * as user from './modules/user';
import * as content from './modules/content';
import * as studies from './modules/studies';
import * as web from './modules/web';
import * as member from './modules/member';
import * as course from './modules/course';
import * as sys from './modules/sys';

const api = {
    ...common,
    ...auth,
    ...user,
    ...content,
    ...studies,
    ...web,
    ...member,
    ...course,
    ...sys,
};

/*const files = require.context('./modules/', true, /\.js$/);
files.keys().forEach((key) => {
    Object.assign(api, files(key));
});*/

export default api;