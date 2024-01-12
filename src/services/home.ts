import {request} from '@/utils/request'

// 首页-查询推荐/减脂/饮食健康/关注页面--百科文章列表
export const getKnowledgeListRequest = (obj: any) => {
  return request('/patient/home/knowledge', 'GET', obj)
}

// 首页-关注的医生列表
export const getPageDocRequest = (obj: any) => {
  return request('/home/page/doc', 'GET', obj)
}