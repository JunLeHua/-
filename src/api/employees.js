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

/**
 *新增员工
 * @param {*} data {}
 * @returns promise
 */
export const addEmployee = data => request({
  url: '/sys/user',
  method: 'POST',
  data
})

/**
 *批量导入员工
 * @param {*} []
 * @returns
 */
export const importEmployee = data => request({
  url: '/sys/user/batch',
  method: 'POST',
  data
})
/**
 *获取员工基本信息
 * @param {*} id 员工ID
 * @returns
 */
export const getEmployeesBaseInfo = id => request({
  url: `/sys/user/${id}`
})
/**
 *保存员工基本信息
 * @param {*} data
 * @returns
 */
export const saveEmployeesBaseInfo = data => request({
  url: `/sys/user/${data.id}`,
  method: 'PUT',
  data
})
/**
 *获取员工个人信息
 * @param {*} id
 * @returns
 */
export const getEmployeesInfo = id => request({
  url: `/employees/${id}/personalInfo`
})
/**
 *获取员工岗位信息
 * @param {*} id
 * @returns
 */
export const getEmployeesJobInfo = id => request({
  url: `/employees/${id}/jobs`
})
/**
 *保存员工岗位信息
 * @param {*} data
 * @returns
 */
export const saveEmployeesJobInfo = data => request({
  url: `/employees/${data.id}/jobs`,
  method: 'PUT',
  data
})

