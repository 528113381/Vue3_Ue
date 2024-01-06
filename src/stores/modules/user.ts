import { ref } from 'vue'
import { defineStore } from 'pinia'

// 定义一个仓库
export const userStore = defineStore('user', () => {
  const user = ref<any>(null)

  //组合式api中 函数就是actions
  const setUser = (e: any) => {
    user.value = e
  }

  const delUser = () => {
    user.value = null
  }

  return { user, setUser, delUser }
},
  {
    persist: true
  }
)
