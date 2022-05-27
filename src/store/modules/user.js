import { setToken, getToken, removeToken, setTime } from '@/utils/auth'
import { login, getUserInfo, getStaffInfo } from '@/api/user'
const state = {
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  updataToken (state, payload) {
    state.token = payload
    setToken(payload)
    setTime(Date.now())
  },
  updataUserInfo (state, payload) {
    state.userInfo = payload
  },
  logout (state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const actions = {
  async login (context, data) {
    const res = await login(data, state)
    // console.log(res)
    context.commit('updataToken', res)
  },
  async getUserInfo (context) {
    const res = await getUserInfo()
    // console.log(res)
    const res1 = await getStaffInfo(res.userId)
    // console.log(res1)
    context.commit('updataUserInfo', res1)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
