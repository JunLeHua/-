import request from '@/utils/request'

/**
 *获取所有角色列表
 * @returns
 */
export function getAllRoles () {
  return request({
    url: '/sys/role'
  })
}
/**
 * 给员工分配角色
 * @param {*} data
 * @returns
 */
export function setRoleToUser (data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}
