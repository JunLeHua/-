import request from '@/utils/request'
// 查询企业的部门列表
export const getDepartmentList = () => request({
  url: '/company/department'
})
// 删除组织部分
export function removeDepartmentById (id) {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}
// 新增部门
export function addDepartment (data) {
  return request({
    method: 'POST',
    url: '/company/department',
    data
  })
}
// 根据ID修改部门详情
export function editDepartment (data) {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}
