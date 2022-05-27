import request from '@/utils/request'
/**
 *获取员工列表
 * @param {*} params 页码
 * @returns promise
 */
export const getUserList = params => request({
  url: '/sys/user',
  params
})
/**
 *删除员工
 * @param {*} id 删除员工ID
 * @returns promise
 */

export const removeEmployess = id => request({
  url: '/sys/user/' + id,
  method: 'DELETE'
})
