<template>
  <div>
    <cp-nav-bar title="推荐关注" />
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <doctor-info
          :item=item
          class="wrap"
          v-for="item in list"
          :key="item.id"
        ></doctor-info>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPageDocRequest } from '@/services/home'
// 屏幕滑动触底了就自动执行 onload函数， 自动把loading修改为true
// 如果开始的数据没有铺满整个屏幕，也会自动发请求，将loading修改为true
const loading = ref(false) // 是否处于加载状态
const finished = ref(false) // 是否已经加载完全部数据
const list = ref<any[]>([])

// 含义和loading类似，
// 开始设置为false，下拉一开始，组件自动将refreshing设置为true。 下拉刷新结束以后，我们需要手动将这个值在设置为false
const refreshing = ref(false) // 是否处于下拉刷新状态
const current = ref(1)
// 下拉加载
const onLoad = async () => {
  // 发送获取数据请求
  const res = await getPageDocRequest({ current: current.value, pageSize: 10 })
  // 如果处于下拉刷新
  if (refreshing.value) {
    // 清空数组
    list.value = []
    // 将下拉状态设置为否
    refreshing.value = false
  }
  // 添加获取到的数据到列表
  list.value.push(...res.data.rows)
  // 将加载状态设置为否
  loading.value = false
  // 判断是否还有数据
  if (list.value, length >= res.data.total) {
    // 将加载完全部数据设置为是
    finished.value = true
  }
  // 页码增加
  current.value++
}

// 下面是上拉刷新的请求
// 下拉刷新的页面本质就是： 将所有数据重置为初始值
// 下拉刷新核心组件 <pull-refresh></pull-refresh>  v-model="refreshing" 变量 refreshing控制是否在下拉  refresh事件控制下拉的时候执行的函数
const onRefresh = () => {
  // 下拉重置
  // 重置页面码
  current.value = 1
  // 将加载完成状态设置为否
  finished.value = false
  // 设置为加载状态
  loading.value = true
  // 调用加载
  onLoad()
}
</script>

<style  lang="scss" scoped>.wrap {
  padding: 15px
}</style>

