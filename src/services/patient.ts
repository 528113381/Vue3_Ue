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
// 查询所有科室-层级
export const getDepAllRequest = () => {
  return request('/dep/all', 'get')
}

// 支付页面-计算就诊信息和抵扣信息
export const getOrderPreRequest = (obj: any) => {
  return request('/patient/consult/order/pre', 'get', obj)
}
// 查询患者详情
export const getpatientInfoRequest = (id: string) => {
  return request(`/patient/info/${id}`, 'get')
}

// 生成订单编号
export const createConsultOrderRequest = (obj: any) => {
  return request('/patient/consult/order', 'post', obj)
}

// 支付接口
export const consultPayRequest = (obj: any) => {
  return request('/patient/consult/pay', 'post', obj)
}
