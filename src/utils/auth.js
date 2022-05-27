import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const TokenTimestamp = 'vue_admin_template_token_timestamp'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
// 取时间戳
export function getTime () {
  return Cookies.get(TokenTimestamp)
}
// 存时间戳
export function setTime (timeStamp) {
  return Cookies.set(TokenTimestamp, timeStamp)
}

