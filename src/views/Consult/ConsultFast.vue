<template>
  <div class="consult-fast-page">
    <cp-nav-bar
      title="极速问诊"
      rtext="问诊记录"
      :rightfn="rightFn"
    ></cp-nav-bar>
    <div class="fast-logo">
      <img
        class="img"
        src="@/assets/consult-fast.png"
        alt=""
      />
      <p class="text"><span>20s</span> 快速匹配专业医生</p>
    </div>
    <div class="fast-type">
      <router-link
        to="/consult/dep"
        class="item"
        @click="goToDepPage(0)"
      >
        <cp-icon
          class="pic"
          name="consult-doctor"
        ></cp-icon>
        <div class="info">
          <p>三甲图文问诊</p>
          <p>三甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
      <router-link
        to="/consult/dep"
        class="item"
        @click="goToDepPage(1)"
      >
        <cp-icon
          class="pic"
          name="consult-message"
        ></cp-icon>
        <div class="info">
          <p>普通图文问诊</p>
          <p>二甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useConsult } from '@/stores'
import type { FastType} from '@/enums/index.ts'
const router = useRouter()
const store = useConsult()
const rightFn = () => {
  router.push('/user/consult')
}
const goToDepPage = (index:FastType) => {
  store.setIllnessType(index)
}


</script>
<style lang="scss" scoped>
p {
  margin: 0;
}

.consult-fast-page {

  // padding-top: 46px;
  .fast-logo {
    padding: 30px 0;
    text-align: center;

    .img {
      width: 240px;
    }

    .text {
      font-size: 16px;
      margin-top: 10px;

      >span {
        color: var(--cp-primary);
      }
    }
  }

  .fast-type {
    padding: 15px;

    .item {
      display: flex;
      padding: 16px;
      border-radius: 4px;
      align-items: center;
      margin-bottom: 16px;
      border: 0.5px solid var(--cp-line);
    }

    .pic {
      font-size: 40px;
    }

    .info {
      margin-left: 12px;
      flex: 1;

      >p:first-child {
        font-size: 16px;
        color: var(--cp-text1);
        margin-bottom: 4px;
      }

      >p:last-child {
        font-size: 13px;
        color: var(--cp-tag);
      }
    }

    .van-icon {
      color: var(--cp-tip);
    }
  }
}</style>
