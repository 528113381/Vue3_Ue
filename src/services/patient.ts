import { request } from '@/utils/request'

// 查询患者的列表数据
export const getPatientListRequest = () => {
  return request('/patient/mylist', 'GET')
}
// 添加患者的接口
export const addPatientRequest = (obj: any) => {
  return request('/patient/add', 'POST', obj)
}
// 编辑患者的接口
export const updatePatientRequest = (obj: any) => {
  return request('/patient/update', 'PUT', obj)
}
// 删除患者的接口
export const deletePatientRequest = (id: any) => {
  return request(`/patient/del/${id}`, 'delete')
}