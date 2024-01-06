import router from '@/router'
import { userStore } from '@/stores'
import axios from 'axios'
import { showToast } from 'vant';

const instance = axios.create({
  // 基础地址
  baseURL: 'https://consult-api.itheima.net/',
  // 超时时间
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 携带token
    const store = userStore()
    if(store.user?.token){
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) => {
    // 业务成功
    if(res.data.code === 10000){
      // 脱壳
      return res.data
    }else{
      // 业务失败
      showToast(res.data.message || '请求失败')
      return Promise.reject(res)
    }
  },
  // 请求失败
  (err) => {
    // 处理401 token失效问题
    if(err.response?.status === 401){
      const store = userStore()
      // 将token和本地存储数据清空
      store.delUser()
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(err)
    }
    return Promise.reject(err)
  }
)

export default instance

export const request = (url:string,method:string,obj:any)=>{
  return instance.request({
    url,
    method,
    // toUpperCase() 转换成大写
    [method.toUpperCase() === 'GET' ? 'params' : 'data'] : obj
  })
}