<template>
  <div class="family">
    <cp-nav-bar
      rtext=""
      :title="route.query.isChange === '1' ? '选择患者' : '家庭档案'"
    />
    <div
      v-if="isChange"
      class="is-change-wrap"
    >
      <div>请选择患者信息</div>
      <div>以便医生给出更准确的治疗，信息进医生可见</div>
    </div>
    <div class="addPrompt">最多可添加 6 人</div>
    <div class="patient-list">
      <div
        class="patient-list-item"
        :class="{ active: patientId === item.id }"
        v-for="item in patientList"
        :key="item.id"
        @click="selectPatient(item)"
      >
        <div class="pli-left">
          <div
            class="pli-left-active"
            v-if="item.defaultFlag === 1"
          >
            <van-tag type="primary">默认</van-tag>
            <span>{{ item.idCard.replace(/^(.{3}).+(.{4})$/, '\$1***********\$2') }}</span>
          </div>
          <div class="pli-left-top">
            <span>{{ item.name }}</span>
            <span v-if="item.defaultFlag === 0">{{ item.idCard.replace(/^(.{3}).+(.{4})$/, '\$1***********\$2') }}</span>
          </div>
          <div class="pli-left-bottom">
            <span>{{ item.genderValue }}</span>
            <span>{{ item.age }}</span>
          </div>
        </div>
        <div class="pli-right">
          <cp-icon
            name="user-edit"
            @click="editPatient(item)"
          ></cp-icon>
        </div>
      </div>

    </div>
    <div
      class="patient-add"
      @click="showPoppup"
    >
      <van-icon
        name="plus"
        class="showPoppup"
      />
      <div>添加患者</div>
    </div>


  </div>

  <div
    v-if="isChange"
    style="margin: 15px"
  >
    <van-button
      type="primary"
      round
      block
      @click="next"
    >下一步</van-button>
  </div>

  <PatientDetail
    ref="popupRef"
    @addSuccessEvent="getPatientList"
    :currentItem="currentItem"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getPatientListRequest } from '@/services/patient'
import PatientDetail from './PatientDetail.vue'
import { showToast } from 'vant';
import { useRoute, useRouter } from 'vue-router'
import { useConsult } from '@/stores'
const route = useRoute()
const router = useRouter()
const store = useConsult()
const patientList = ref<any[]>([])
const currentItem = ref<any>({})
const popupRef = ref<any>(null)
const patientId = ref<string>('')
const getPatientList = async () => {
  const res = await getPatientListRequest()
  patientList.value = res.data

  // isChang有值并且患者列表不是空数组
  if (isChange.value && patientList.value.length > 0) {
    // 判断是否设置了默认患者
    const index = patientList.value.findIndex((item: any) =>
      item.defaultFlag === 1)
    // 没有患者
    if (index === -1) {
      patientId.value = patientList.value[0].id
    } else {
      // 有默认患者
      patientId.value = patientList.value[index].id
    }

  }
}
getPatientList()

// 显示弹出层
const showPoppup = () => {
  if (patientList.value.length === 6) {
    showToast('患者信息最多添加6个')
    return
  }
  currentItem.value = {}
  popupRef.value.openPopup()
}
// 编辑
const editPatient = (item: any) => {
  currentItem.value = item
  popupRef.value.openPopup()
}

const isChange = computed(() => {
  return route.query.isChange === '1'
})

const next = () => {
  // 1. 保存id数据到pinia里面去
  store.setPatientId(patientId.value)

  // 2. 路由跳转到支付页面
  router.push('/consult/pay')

}


// 患者的点击事件
const selectPatient = (item: any) => {
  patientId.value = item.id
}


</script>

<style lang="scss" scoped>
.family {
  .patient-list {
    padding: 15px;

    &-item {
      background-color: var(--cp-bg);
      padding: 15px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .pli-left {
        &-top {
          margin-bottom: 8px;

          span:nth-child(1) {
            font-size: 16px;
            font-weight: 700;
          }

          span:nth-child(2) {
            font-size: 14px;
            color: var(--cp-text2);
            margin-left: 20px;

          }
        }

        &-bottom {
          color: var(--cp-text3);
          font-size: 13px;

          span:nth-child(2) {
            margin-left: 16px;
          }
        }

        &-active {
          margin-bottom: 10px;
          display: flex;
          align-items: center;

          span:nth-child(2) {
            margin-left: 15px;
            font-size: 12px;
            color: var(--cp-text3);
          }
        }
      }

      .pli-right {
        font-size: 16px;
      }


      &.active {
        border: 1px solid var(--cp-primary);
        background-color: #f0faf9;


        .pli-right {
          color: var(--cp-primary);
        }
      }
    }



  }

  .patient-add {
    margin: 0 15px;
    background-color: var(--cp-bg);
    padding: 15px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    color: var(--cp-primary);
    font-size: 12px;

    .addIcon {
      font-size: 16px;
      margin-bottom: 6px;
    }
  }

  .addPrompt {
    padding: 15px 15px 0;
    font-size: 12px;
    color: var(--cp-tip);
  }
}

:deep(.van-cell.van-field) {
  padding: 15px 0;
}

.is-change-wrap {
  padding: 15px;

  div:nth-child(1) {
    font-size: 18px;
    font-weight: bold;
  }

  div:nth-child(2) {
    font-size: 14px;
    color: var(--cp-tip);
    margin-top: 5px;
  }
}
</style>
