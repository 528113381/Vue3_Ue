<template>
  <div class="user">
    <div class="user-header">
      <div class="user-header-info">
        <div class="uhi-image">
          <img :src="userInfo.avatar || userImg" />
        </div>
        <div class="uhi-rigth">
          <div class="uhir-1">{{ userInfo.account }}</div>
          <van-icon class="uhir-2" name="edit" @click="updateName" />
        </div>
      </div>
      <van-row class="user-header-tools">
        <van-col span="6" @click="goToCollection">
          <div>{{ userInfo.collectionNumber }}</div>
          <div>收藏</div>
        </van-col>
        <van-col span="6" @click="goToLike">
          <div>{{ userInfo.likeNumber }}</div>
          <div>关注</div>
        </van-col>
        <van-col span="6" @click="goToScore">
          <div>{{ userInfo.score }}</div>
          <div>积分</div>
        </van-col>
        <van-col span="6" @click="goToCoupon">
          <div>{{ userInfo.couponNumber }}</div>
          <div>优惠卷</div>
        </van-col>
      </van-row>

    </div>
    <div class="user-consult" v-if="userInfo.consultationInfo?.length === 0">
      <div class="swipeTitle"> 问诊中</div>
      <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#16c2a3">
        <van-swipe-item v-for="item in 5" :key="item">
          <doctor-info />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="user-order">
      <div class="user-order-top">
        <div class="orderTitle">药品订单</div>
        <div >
          <span style="margin-right: 6px;" @click="goToOrder">全部订单</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <van-row class="user-order-bottom">
        <van-col span="6">
          <van-badge :show-zero="false" :content="userInfo.orderInfo?.paidNumber" max="99">
            <cp-icon name="user-paid" />
          </van-badge>
          <div>
            待付款
          </div>
        </van-col>
        <van-col span="6">
          <van-badge :show-zero="false" :content="userInfo.orderInfo?.receivedNumber" max="99">
            <cp-icon name="user-shipped" />
          </van-badge>
          <div>
            待发货
          </div>
        </van-col>
        <van-col span="6">
          <van-badge :show-zero="false" :content="userInfo.orderInfo?.shippedNumber" max="99">
            <cp-icon name="user-received" />
          </van-badge>
          <div>
            待收货
          </div>
        </van-col>
        <van-col span="6">
          <van-badge :show-zero="false" :content="userInfo.orderInfo?.finishedNumber" max="99">
            <cp-icon name="user-finished" />
          </van-badge>
          <div>
            已完成
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="user-tools">
      <div class="user-tools-title">
        快捷工具
      </div>
      <div class="user-tools-content">
        <van-cell is-link v-for="(item, index) in tools" :key="index" :to="item.path">
          <template #title>
            <cp-icon :name="`user-tool-0${index + 1}`" />
            <span>{{ item.label }}</span>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { getUserInfoRequest } from '@/services/user'
import userImg from '@/assets/018AED90.gif'
const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/user/prescription' },
  { label: '家庭档案', path: '/user/Family' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/user/evaluate' },
  { label: '官方客服', path: '/user/contact' },
  { label: '设置', path: '/user/settings' }
]
const userInfo = ref<any>({})

const getUserInfo = async () => {
  const res = await getUserInfoRequest()
  userInfo.value = res.data
}
getUserInfo()
const updateName = () =>{
  router.push('user/updatename')
}
const goToCollection = () =>{
  router.push('user/collection')
}
const goToLike = () =>{
  router.push('user/like')
}
const goToScore = () =>{
  router.push('user/score')
}
const goToCoupon = () =>{
  router.push('user/coupon')
}
const goToOrder = () =>{
  router.push('user/order')
}
</script>
<style lang="scss" scoped>
// autoprefixer 插件 自动添加浏览器适配前缀
.user {
  width: 100%;
  padding: 0 15px 60px 15px;
  min-height: calc(100vh - 50px);
  background-color: var(--cp-bg);
  ;

  &-header {
    height: 200px;
    margin: 0 -15px 20px;
    background: linear-gradient(180deg, rgba(44, 181, 165, .46), rgba(44, 181, 165, 0));

    &-info {
      padding-top: 50px;
      // background-color: red;
      display: flex;
      margin: 0 15px;

      .uhi-image {
        width: 70px;
        height: 70px;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .uhi-rigth {
        margin-left: 15px;

        .uhir-1 {
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
        }

        .uhir-2 {
          font-size: 16px;
          color: var(--cp-primary);
          margin-top: 8px;
        }
      }
    }


    &-tools {
      margin-top: 15px;

      .van-col {
        text-align: center;

        // nth-child选择器，可以减少一些类名的定义，减轻css复杂度
        div:nth-child(1) {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 4px;
        }

        div:nth-child(2) {
          font-size: 12px;
          color: var(--cp-dark);
        }
      }
    }
  }

  &-consult {
    margin: 15px 0;
    background-color: #fff;
    padding: 15px 10px 0px 15px;
    border-radius: 10px;

    .swipeTitle {
      font-weight: 700;
      margin-bottom: 20px;
    }

    .my-swipe {
      border-radius: 8px;
    }

    .my-swipe .van-swipe-item {
      color: #000;
      padding: 0px 0px 36px 0px;
      background-color: #fff;
    }
  }


  &-order {
    margin: 15px 0;
    background-color: #fff;

    border-radius: 10px;

    &-top {
      display: flex;
      justify-content: space-between;
      padding: 15px 15px 0px 15px;


      .orderTitle {
        font-weight: 700;
        margin-bottom: 20px;
        font-size: 16px;
      }

      div:nth-child(2) {
        font-size: 14px;
        color: var(--cp-dark);
      }
    }

    &-bottom {
      padding-bottom: 14px;

      .van-col {
        text-align: center;

        div:first-child {
          font-size: 30px;
        }

        div:last-child {
          font-size: 12px;
        }
      }
    }


  }

  &-tools {
    margin: 15px 0;
    background-color: #fff;
    border-radius: 10px;
    padding-bottom: 10px;

    &-title {
      font-weight: 700;
      margin-bottom: 20px;
      font-size: 16px;
      padding: 15px 10px 0px 15px;
    }

    &-content {
      :deep(.van-cell__title) {
        font-size: 18px;
        display: flex;
        align-items: center;

        span {
          margin-left: 10px;
          font-size: 14px;
        }
      }
    }


  }

}
</style>