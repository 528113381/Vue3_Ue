<template>
  <div>
    <cp-nav-bar
      rtext="保存"
      title="修改昵称"
      :rightfn="save"
    />
    <div class="update">
      <van-form>
        <van-field
          v-model="value1"
          label="用户昵称"
          placeholder="请输入昵称"
          clearable
        >
          <!-- <template #button>
            <van-icon
              name="clear"
              class="my-icon"
              @click="clear"
              
            />
          </template> -->
        </van-field>
        <div class="title">
          4-20个字符,可由英文和符号组成
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref('李富贵')
const save = () => {
  console.log('保存');

}
// const clear = () => {
//   value1.value = ''
// }
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  padding: 10px 16px;
  color: var(--cp-tip);
}

.my-icon {
  color: #c4c4c4;
  font-size: 16px;
}</style>