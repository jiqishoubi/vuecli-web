import { save } from "../func";
import request from "@/utils/request";
import { getAllMenuAjax } from "@/services/user";
import { LOGIN_TOKEN_KEY, loginPath } from "@/utils/consts";
import router from "@/router/index";

const defaultState = {
  userInfo: null,
  allMenu: [],
  menuTree: [],
  rightsArr: [],
};

const user = {
  namespaced: true,
  state: () => defaultState,
  getters: {},
  actions: {
    initUserInfo({ state, getters, dispatch, commit }) {
      dispatch("getUserInfo");
      dispatch("getMenu");
    },
    getUserInfo({ state, getters, dispatch, commit }) {
      return request({
        url: "/web/getLoginStaffInfo",
      }).then((data) => {
        commit("save", { userInfo: data || {} });
      });
    },
    async getMenu({ state, getters, dispatch, commit }) {
      const menuTreeObj = await getAllMenuAjax();
      commit("save", menuTreeObj);
    },
    logout({ state, getters, dispatch, commit }) {
      request({
        url: "/web/doLogout",
        isNeedErrMsg: false,
      });
      commit("save", defaultState);
      localStorage.removeItem(LOGIN_TOKEN_KEY); // 清空token
      router.replace(loginPath);
    },
  },
  mutations: { save },
};

export default user;
