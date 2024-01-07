<template>
  <van-nav-bar
    left-arrow
    :right-text="rtext"
    :title="title"
    @click-left="onClickLeft"
    @click-right="onclickRight"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    rtext?: string
    title?: string
    leftfn?: () => void
    rightfn?: () => void
  }>(),
  {
    rtext: '',
    title: ''
  }
)


const router = useRouter()


// 左侧按钮点击事件
const onClickLeft = () => {
  // 如果传递了左侧点击事件触发的函数
  if (props.leftfn) {
    props.leftfn()
  } else {
    router.back()
  }
}

//右侧按钮点击事件
const onclickRight = () => {
  if (props.rightfn) {
    props.rightfn()
  } else {
    router.push('/register')
  }

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