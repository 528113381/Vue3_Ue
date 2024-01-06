<template>
  <div>
    <slot name="icon" :count="count" :msg="msg">
      <van-icon name="like-o"/>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const count = ref(1)
const msg = ref('消息')

</script>