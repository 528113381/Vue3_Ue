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