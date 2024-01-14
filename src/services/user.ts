import { request } from "@/utils/request";

export const loginRequest = (obj:any)=>{
  return request('/login/password','POST',obj)
}

export const getCodeRequest = (obj:any)=>{
  return request('/code',"GET",obj)
}

export const loginByCodeRequest = (obj:any)=>{
  return request('/login','POST',obj)
}

export const getUserInfoRequest = ()=>{
  return request('/patient/myUser','GET')
}
// 关注各种场景的通用接口 一共有四种类型
// topic百科话题,knowledge百科文章,doc医生,disease疾病
export const likeRequest = (obj: any) => {
  return request('/like', 'POST', obj)
}

// 上传图片
export const uploadRequest = (obj: any) => {
  return request('/upload', 'POST', obj)
}