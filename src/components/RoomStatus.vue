<script setup lang="ts">
import { ref } from 'vue'

const state = ref(1)
</script>

<template>
  <!-- 这里的页面同一个位置 根据不同的状态 有多种UI效果，如果后端接口还没有写完 -->
  <!-- 先根据注释法，吧这个位置的多种结构 都写出来，同注释来查看不同的效果。等java接口完，我们在发请求用真实的 数据 结合 v-if 来冬天显示三个标签 -->
  <div class="room-status">
    <div class="wait" v-if="state === 1">已通知医生尽快接诊，24小时内医生未回复将自动退款</div>
    <div class="chat" v-if="state === 2">
      <span>咨询中</span>
      <span>剩余时间：23:10:34</span>
    </div>
    <div class="end" v-if="state === 3"><van-icon name="passed" /> 已结束</div>
  </div>
</template>

<style lang="scss" scoped>
.room-status {
  position: fixed;
  left: 0;
  top: 46px;
  height: 44px;
  width: 100%;
  background-color: #fff;
  font-size: 13px;
  z-index: 1;
  .wait {
    padding: 0 15px;
    background-color: var(--cp-plain);
    height: 100%;
    line-height: 44px;
    text-align: center;
    color: var(--cp-primary);
  }
  .chat {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    span {
      &:first-child {
        color: var(--cp-primary);
      }
      &:last-child {
        color: var(--cp-text2);
        width: 130px;
        .van-count-down {
          display: inline;
        }
      }
    }
  }
  .end {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 15px;
    font-weight: 500;
    .van-icon {
      font-size: 14px;
      margin-right: 4px;
      position: relative;
      top: 1px;
    }
  }
}
</style>
