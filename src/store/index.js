import Vue from "vue";
import Vuex from "vuex";
import man from "@plugins/man";
Vue.use(Vuex);

const files = require.context("./modules", false, /\.js$/);
const modules = {};
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

export default new Vuex.Store({
  namespaced: true,
  modules: modules,
  state: {
    token: false,
    uuid: false,
    userInfo: false,
    screenHeight: 0,
    pageTitle: false,
  },
  mutations: {
    setToken: (state, data) => {
      state.token = data;
    },
    setUUID: (state, data) => {
      state.uuid = data;
    },
    setUserInfo: (state, data) => {
      state.userInfo = data;
    },
    logout: (state) => {
      state.token = false;
      state.uuid = false;
      state.userInfo = false;
    },
    setScreenHeight: (state, data) => {
      state.screenHeight = data;
    },
    setPageTitle: (state, data) => {
      state.pageTitle = data;
    },
  },
  actions: {
    /**
     * 加载到 state
     * @param state
     * @param dispatch
     * @param commit
     */
    load({ state, dispatch, commit }) {
      if (
        man.cookies.get("dbGuardId") === undefined ||
        man.db.load("session.guardId") === undefined ||
        man.cookies.get("dbGuardId") !== man.db.load("session.guardId")
      ) {
        man.db.save("session", {});
        let guardId = man.fast.getRandomJoinTimestamp();
        man.cookies.set("dbGuardId", guardId);
        man.db.save("session.guardId", guardId);
      }
      let token = man.cookies.get("token") || false,
        uuid = man.cookies.get("uuid") || false,
        userInfo = man.db.load("session.userInfo") || false;
      commit("setToken", token);
      commit("setUUID", uuid);
      commit("setUserInfo", userInfo);
      man.cookies.set("uuid", state.uuid);
    },

    /**
     * 退出登录
     * @param state
     * @param dispatch
     * @param commit
     */
    logout({ state, dispatch, commit }) {
      man.cookies.remove("token");
      man.cookies.remove("uuid");
      man.cookies.remove("dbGuardId");
      man.db.save("session", {});
      man.db.save("tmp", {});
      commit("logout");
    },

    /**
     * 重新登录
     * @param state
     * @param dispatch
     * @param commit
     */
    reLogin({ state, dispatch, commit }) {
      man.cookies.remove("token");
      man.cookies.remove("uuid");
      man.db.save("session", {});
      man.db.save("tmp.needBack", true);
      commit("logout");
    },
  },
});
