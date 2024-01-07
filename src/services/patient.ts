import { request } from '@/utils/request'

// 查询患者的列表数据
export const getPatientListRequest = () => {
  return request('/patient/mylist', 'GET')
}