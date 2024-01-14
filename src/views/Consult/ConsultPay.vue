<template>
  <div v-if="payInfo.payment && patientInfo.name">
    <div class="consult-pay-page">
      <cp-nav-bar title="支付" />
      <div class="pay-info">
        <p class="tit">图文问诊{{ payInfo.payment }}元</p>
        <img
          class="img"
          src="@/assets/avatar-doctor.svg"
        />
        <p class="desc">
          <span>极速问诊</span>
          <span>自动分配医生</span>
        </p>
      </div>
      <van-cell-group>
        <van-cell
          title="优惠券"
          :value="`-¥${payInfo.couponDeduction}`"
        />
        <van-cell
          title="积分抵扣"
          :value="`-¥${payInfo.pointDeduction}`"
        />
        <van-cell
          title="实付款"
          :value="`-¥${payInfo.actualPayment}`"
          class="pay-price"
        />
      </van-cell-group>
      <div class="pay-space"></div>
      <van-cell-group>
        <van-cell
          title="患者信息"
          :value="`${patientInfo.name} | ${patientInfo.genderValue} | ${patientInfo.age}岁`"
        ></van-cell>
        <van-cell
          title="病情描述"
          :label="store.consult.illnessDesc"
        ></van-cell>
      </van-cell-group>
      <div class="pay-schema">
        <van-checkbox v-model="checked">我已同意 <span class="text">支付协议</span></van-checkbox>
      </div>
      <van-submit-bar
        button-type="primary"
        :price="payInfo.actualPayment * 100"
        button-text="立即支付"
        text-align="left"
        @submit="onSubmit"
      />
    </div>
  </div>
  <div v-else>
    <van-loading />
  </div>
  <van-action-sheet
    v-model:show="show"
    title="选择支付方式"
    :close-on-popstate="false"
    :closeable="false"
    :before-close="beforeClose"
  >
    <div class="pay-type">
      <p class="amount">￥{{ payInfo.actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell
          title="微信支付"
          @click="paymentMethod = 0"
        >
          <template #icon><cp-icon name="consult-wechat" /></template>
          <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
        </van-cell>
        <van-cell
          title="支付宝支付"
          @click="paymentMethod = 1"
        >
          <template #icon><cp-icon name="consult-alipay" /></template>
          <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button
          type="primary"
          round
          block
          @click="goToPay"
        >立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import router from '@/router'
import { getOrderPreRequest, getpatientInfoRequest, createConsultOrderRequest, consultPayRequest } from '@/services/patient'
import { useConsult } from '@/stores'
import { ref } from 'vue'
import { showToast,showConfirmDialog,showLoadingToast } from 'vant'
// import {computed} from 'vue'

const store = useConsult()
const patientInfo = ref<any>({})
const payInfo = ref<any>({})
const checked = ref(false)
const show = ref(false)
const paymentMethod = ref<0 | 1>(0)
const loading = ref(false)
const orderId = ref('')
import { onBeforeRouteLeave } from 'vue-router';
onBeforeRouteLeave(() => {
  if (orderId.value) {
    return false
  }
})
const getOrderPre = async () => {
  // 获取最后订单的价格： 之前我写的项目里面负责了支付功能，我们的项目支付涉及到 优惠券，积分抵扣等功能，都是在一个预支付接口里面，传递对应的参数既可
  console.log(store.consult.type);

  const res = await getOrderPreRequest({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  payInfo.value = res.data
}

const getpatientInfo = async () => {
  const res = await getpatientInfoRequest(store.consult.patientId)
  patientInfo.value = res.data
}
getOrderPre()
getpatientInfo()

const onSubmit = async () => {
  if (!checked.value) {
    showToast('请勾选支付协议')
    return
  }
  loading.value = true
  const res = await createConsultOrderRequest(store.consult)
  orderId.value = res.data.id
  loading.value = false
  show.value = true
}
// const paymentMethodComputed = computed({
//   get() {
//     return paymentMethod.value === 0 ? true : false
//   },
//   set(val: any) {
//     console.log('设置computed的值:', val)

//     paymentMethod.value = val ? 0 : 1
//   }
// })

const beforeClose = ()=>{
  showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    confirmButtonText: '继续支付',
    cancelButtonText: '仍要关闭'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      // 点击了仍要关闭，在做一些跳转的处理
      orderId.value = ''
      // 强行关闭以后，去到问诊记录页面
      router.push('/user/consult')
      // 最后在手动关闭弹出层
      return true
    })
}
const goToPay = async () => {
  showLoadingToast({
    message: '支付中...',
    forbidClick: true
  })
  // 下面这个请求是和我们的java接口通信，java再和支付宝 支付接口对接。 返回一个支付宝的支付连接地址即可
  const res = await consultPayRequest({
    paymentMethod: paymentMethod.value,
    orderId: orderId.value,
    // 支付宝支付成功以后，回来跳转的页面
    payCallback: 'http://localhost:5173/#/room'
  })
  console.log(res)
  // 请求成功以后，会返回一个支付宝的公网地址，需要使用BOM的location api手动跳过去
  window.location.href = res.data.payUrl
}
</script>


<style lang="scss" scoped>
.consult-pay-page {
  p {
    margin: 0;
  }
}

.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;

  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }

  .desc {
    flex: 1;

    >span {
      display: block;
      color: var(--cp-tag);

      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}

.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }

    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}

.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}

.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;

  .text {
    color: var(--cp-primary);
  }
}

::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}

.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }

  .btn {
    padding: 15px;
  }

  .van-cell {
    align-items: center;

    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }

    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
