<template>
  <div class="collection">
    <div class="nav">
      <cp-nav-bar
        rtext=""
        title="家庭档案"
      />
    </div>
    <div class="ctab">
      <van-tabs v-model:active="activeName">
        <van-tab
          title="科普"
          name="a"
        >
          <div class="list">
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item.name"
              is-link
            />
          </div>
        </van-tab>
        <van-tab
          title="疾病"
          name="b"
        >
          <div class="list">
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item.name"
              is-link
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <div class="nomore">
      <van-divider class="title">没有更多了</van-divider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const activeName = ref('b');
const list = ref<any[]>([
  { name: '高血压' },
  { name: '冠心病' },
  { name: '冠心病' },
  { name: '冠心病' },
  { name: '冠心病' },
  { name: '冠心病' },
  { name: '冠心病' },
  { name: '冠心病' },
  { name: '冠心病' },
  { name: '冠心病' },
  { name: '冠心病' },
  { name: '冠心病' },



])

</script>

<style lang="scss" scoped>
  .ctab {
    height: calc(100vh - 46px);
 
  // overflow:hidden;
  
}

.nomore {
  .title {
    padding: 0 15px;
    font-size: 12px;
  }
}

</style>