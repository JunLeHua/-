import request from '@/utils/request'
// 根据id查询企业
export function getCompanyById (id) {
  return request({
    url: `/company/${id}`
  })
}
// 获取所有的角色列表
export const getRoleList = params => {
  return request({
    url: '/sys/role',
    params
  })
}
// 根据ID删除角色
export function removeCompanyById (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
// 添加角色
export const addRoles = data => request({
  url: '/sys/role',
  method: 'POST',
  data
})
// 获取所有的权限列表
export const getAllPermissions = () => {
  return request({
    url: '/sys/permission'
  })
}
// 根据id更新企业
export const editRoles = data => request({
  url: `/sys/role/${data.id}`,
  method: 'PUT',
  data
})
// 根据ID获取权限点详情
export const getPermissionById = id => {
  return request({
    url: `/sys/role/${id}`
  })
}
// 给角色设置权限
export const assignPermission = data => {
  return request({
    method: 'PUT',
    url: '/sys/role/assignPrem',
    data
  })
}
