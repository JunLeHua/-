import request from '@/utils/request'

/**
 *获取所有权限点
 * @returns
 */
export function getAllRights () {
  return request({
    url: '/sys/permission'
  })
}
/**
 * 添加权限点
 * @param {*} data
 * @returns
 */
export function addRights (data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}
/**
 *根据ID获取权限点详情
 * @param {*} id
 * @returns
 */
export function getRightsByIdInfo (id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
/**
 * 根据ID更新权限点详情
 * @param {*} data
 * @returns
 */
export function editRights (data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}
