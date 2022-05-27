import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  const token = store.getters.token
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response)
  const { success, data, message } = response.data
  // console.log(123)
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
    // Promise.reject() 错误的时候让代码进入catch里面  如果没加会进入try里面
  }
}, function (error) {
  // 对响应错误做点什么
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.commit('user/logout')
    router.push('/login')
  }
  // console.log(123)
  return Promise.reject(new Error(error))
})

export default service
