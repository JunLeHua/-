import request from '@/utils/request'

/**
 *
 * @param {对象} data
 * @returns promise
 */
// 登录
export const login = data => request({
  method: 'POST',
  url: '/sys/login',
  data
})

// 获取用户个人资料
export const getUserInfo = () => request({
  url: '/sys/profile',
  method: 'POST'

})
// 获取员工基本信息
export const getStaffInfo = id => request({
  url: `/sys/user/${id}`
})
// 获取员工简单列表
export function getStaffSimpleList () {
  return request({
    url: '/sys/user/simple'
  })
}
