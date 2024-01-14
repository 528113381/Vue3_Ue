<template>
  <div class="cp-radio-btn">
    <div class="radio-warp">
      <div
        class="radio-warp-item"
        v-for="item in list"
        :key="item.id"
        @click="genderChoose(item)"
        :class="{ active: modelValue === item.id, mini: item.name.length >1 }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'



// const list = ref<any[]>([
//   { id: 1, name: '男' },
//   { id: 0, name: '女' }
// ])

const props = defineProps<{
  modelValue: number | undefined,
  list: any[]
}>()
console.log(props);

const emits = defineEmits(['update:modelValue'])

const genderChoose = (item: any) => {
  console.log(item);
  emits('update:modelValue', item.id)
}


</script>

<style lang="scss" scoped>
.cp-radio-btn {
  display: flex;

  .radio-warp {
    display: flex;
    flex-wrap: wrap;

    &-item {
      font-size: 13px;
      background-color: var(--cp-bg);
      border-radius: 4px;
      padding: 8px 21px;
      margin-right: 12px;
      line-height: 1em;
      cursor: pointer;

      &.mini {
        padding: 9px 14px;
        border-radius: 5px;
        margin-bottom: 4px;
      }

      &.active {
        border: 1px solid var(--cp-primary);
        background-color: #f0faf9;
      }
    }

  }
}</style>