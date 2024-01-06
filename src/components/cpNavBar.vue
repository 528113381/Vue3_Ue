<template>
  <van-nav-bar 
  left-arrow
  @click-left="onClickLeft"
  :right-text="rtext"
  @click-right="onclickRight" />
</template>

<script setup lang="ts">
import {useRoute,useRouter} from 'vue-router'

defineProps<{
  rtext: string
}>()

const route = useRoute()
const router = useRouter()
console.log(route);

const onClickLeft  = ()=>{
  router.back()
}
const onclickRight = ()=>{
  router.push('/register')
}
</script>

<style lang="scss" scoped>
// 添加了scoped以后，van的样式就不会生效，样式穿透的问题，涉及到深度选择器
// 修改vant-ui的样式，一般是两种方法：
// 1. 再写一个style标签，不写scoped属性， 在结合一个自定义的父类，实现私有化
// 2. 深度选择器的语法，有很多的变化，
// 在vue2里面  ::v-deep .main   /deep/ .main
// 在vue3里面  :deep(.main) {}
:deep(.van-nav-bar__text) {
  color: var(--cp-primary);
}
</style>