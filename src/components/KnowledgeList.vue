<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></knowledge-card>
    </van-list>


  </div>
</template>

<script setup lang="ts" >
import KnowledgeCard from './KnowledgeCard.vue'
import { ref } from 'vue'
import { getKnowledgeListRequest } from '@/services/home'
const props = defineProps<{
  type:string
}>()

// 加载中是true 加载完毕为false 每次滚到底部插件会自动改为true进行加载
const loading = ref<boolean>(false);
// 数据是否加载完毕 触底也不会再发请求 也就是loading不会再变为true
const finished = ref<boolean>(false);
const list = ref<any[]>([]);
const current = ref(1)
const total = ref(1)
// 每次触底执行的函数
const onLoad = async() => {
  const res = await getKnowledgeListRequest({
    type:props.type,
    current:current.value,
    pageSize:10
  })
  current.value++
  loading.value=false
  // list.value= [...list.value,...res.data.rows]
  list.value.push(...res.data.rows)
  total.value= res.data.total

  if(list.value.length >= total.value){
    finished.value = true
  }
}

</script>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
