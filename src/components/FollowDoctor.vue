<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;" @click="goToMore"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <!-- swipe 组件 -->
      <van-swipe
        :width="150 / width * width"
        :show-indicators="false"
        :loop="false"
      >
        <van-swipe-item
          v-for="item in list"
          :key="item.id"
        >
          <doctor-card :item="item"  />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPageDocRequest } from '@/services/home';
import DoctorCard from './DoctorCard.vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const goToMore = () => {
  router.push('/home/recomment-follow')
}
// const { x, y } = useWindowScroll()
// const test = () => {
//   y.value = 800
// }
const list = ref<any[]>([])

const { width, height } = useWindowSize()

const init =async()=>{
  const res = await  getPageDocRequest({current:1,pageSize:5})
  list.value = res.data.rows
  
}
init()

// 处理兼容性问题
// const width = ref<any>(0)
// width.value = window.innerWidth
// const setWidth = ()=>{
//   width.value = window.innerWidth
// }
// onMounted(() => {
//   window.addEventListener('resize',setWidth)
// })
// onUnmounted(()=>{
//   window.removeEventListener('resize',setWidth)
// })

</script>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;

  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;

    >a {
      color: var(--cp-tip);
    }
  }

  .body {
    width: 100%;
    overflow: hidden;
  }
}</style>
