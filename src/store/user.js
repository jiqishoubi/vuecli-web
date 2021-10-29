import request from "@/utils/request"
import produce from 'immer';
import lodash from 'lodash'

const user = {
  namespaced: true,
  state: () => ({
    userInfo: null,
  }),
  getters: {},
  actions: {
    // initUserInfo(a, b, c, d) {

    // },
    getUserInfo({ state, getters, dispatch, commit }) {
      return request({
        url: '/web/getLoginStaffInfo'
      }).then((data) => {
        commit('save', { userInfo: data || {} })
      })
    }
  },
  mutations: {
    save(state, payload) {
      if (payload && Object.prototype.toString.call(payload) === '[object Object]') {
        for (let key in payload) {
          if (payload.hasOwnProperty(key)) {
            state[key] = lodash.cloneDeep(payload[key]);
          }
        }
        return state
      }
    }
  },
}

export default user
