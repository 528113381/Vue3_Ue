<template>
  <!-- <div>{{ modelValue }}</div> -->
  <div>{{ msg }}</div>
  <div>{{ count }}</div>
  <button @click="update">66666</button>
</template>

<script setup lang="ts">
const props = defineProps({
  // msg : String
  // modelValue:String
  msg:String,
  count : Number
})

// const emits = defineEmits(['update'])
// const emits = defineEmits(['update:modelValue'])
const emits = defineEmits(['update:msg','update:count'])
const update = ()=>{
  // emits('update',props.msg+'666')
  // emits('update:modelValue',props.modelValue+'6666')
  emits('update:msg',props.msg+'666')
  // emits('update:count',props.count + 666)

}
</script>