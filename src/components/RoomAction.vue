<script setup lang="ts">
import { ref } from 'vue'

const state = ref(1)
</script>

<template>
  <div class="room-action" v-if="state === 2">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      :disabled="true"
    ></van-field>
    <van-uploader :preview-image="false" :disabled="true">
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
  <div class="room-action" v-else>
    <van-button type="primary" round block>{{
      state === 3 ? '再次问诊' : '咨询其他医生'
    }}</van-button>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
