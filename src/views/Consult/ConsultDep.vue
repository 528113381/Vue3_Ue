<template>
  <div class="consult-dep">
    <div ref="myNav">
      <cp-nav-bar title="选择科室"></cp-nav-bar>
    </div>
    <div class="consult-dep-wrap">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="item.name"
          v-for="item in list"
          :key="item.id"
        />

      </van-sidebar>
      <div class="consult-dep-wrap-right">
        <div
          class="right-item"
          v-for="item in secondDepList"
          :key="item.id"
          @click="goToPage(item.id)"
        >{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getDepAllRequest } from '@/services/patient'
import { useRouter } from 'vue-router';
import { useConsult } from '@/stores';
const active = ref(0)
const myNav = ref<HTMLElement>();
const router = useRouter()
const store = useConsult()


const list = ref<any[]>([])

const getDepAll = async () => {
  const res = await getDepAllRequest()
  console.log(res)
  list.value = res.data
}
getDepAll()

const secondDepList = computed(() => {
  return list.value[active.value as any]?.child
})

const goToPage = (id:string)=>{
  store.setDepId(id)
  router.push('/consult/illness')
}

</script>
<style lang="scss">
:root {
  --van-sidebar-width: 120px
}
</style>

<style lang="scss" scoped>
.consult-dep {
  &-wrap {
    display: flex;
    height: 100%;
    height: calc(100vh - 46px);

    &-right {
      flex: 1;

      .right-item {
        color: var(--cp-tip);
        padding: 14px 30px;
        font-size: 14px;
      }
    }
  }
}</style>