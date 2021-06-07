import man from "@plugins/man";
const root = {root: true};

export default {
    namespaced: true,
    state: {},
    actions: {
        setToken({state, dispatch, commit}, value) {
            commit('setToken', value, root);
            man.cookies.set('token', value);
            man.db.save('session.userInfo.token', value);
        },
        setUUID({state, dispatch, commit}, value) {
            commit('setUUID', value, root);
            man.cookies.set('uuid', value);
            man.db.save('sys.uuid', value);
        },
        setUserInfo({state, dispatch, commit}, value) {
            commit('setUserInfo', value, root);
            man.db.save('session.userInfo', value);
        },

        /*load({state, dispatch}) {
            return new Promise(async resolve => {
                state.info = await dispatch('db/get', {
                    collection: 'info'
                });
                resolve();
            });
        },*/
    }
}