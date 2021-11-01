import { save } from '../func'
import request from "@/utils/request"
import { getAllMenuAjax } from '@/services/user'

const user = {
  namespaced: true,
  state: () => ({
    userInfo: null,
    allMenu: [],
    menuTree: [],
    rightsArr: [],
  }),
  getters: {},
  actions: {
    initUserInfo({ state, getters, dispatch, commit }) {
      dispatch('getUserInfo')
      dispatch('getMenu')
    },
    getUserInfo({ state, getters, dispatch, commit }) {
      return request({
        url: '/web/getLoginStaffInfo'
      }).then((data) => {
        commit('save', { userInfo: data || {} })
      })
    },
    async getMenu({ state, getters, dispatch, commit }) {
      const menuTreeObj = await getAllMenuAjax();
      commit('save', menuTreeObj)
    }
  },
  mutations: { save },
}

export default user
