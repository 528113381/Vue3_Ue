import { ref } from 'vue'
import { likeRequest } from '@/services/user'
import { showToast } from 'vant'
export const useFollow = (params:any)=>{
  const loading = ref(false)

  const follow = async ()=>{
    try {
      loading.value = true
      await likeRequest({
        type: params.type,
        id: params.item.id
      })
      loading.value = false
      showToast(params.item.likeFlag === 1 ? '取消关注' : '关注成功')
      // 父传子 传递复杂数据类型 可以修改对象属性来做到子修改父属性
      if (params.item.likeFlag === 1) {
        params.item.likeFlag = 0
      } else {
        params.item.likeFlag = 1
      }
    } catch (error) {
      loading.value = false
    }
  }
  return { loading, follow }
}

