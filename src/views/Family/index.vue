<template>
  <div class="family">
    <cp-nav-bar
      rtext=""
      title="家庭档案"
    />
    <div class="addPrompt">最多可添加 6 人</div>
    <div class="patient-list">
      <div
        class="patient-list-item"
        :class="{ active: item.defaultFlag === 1 }"
        v-for="item in patientList"
        :key="item.id"
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
          <cp-icon name="user-edit" @click="editPatient(item)" ></cp-icon>
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

  <PatientDetail ref="popupRef" @addSuccessEvent="getPatientList"
  :currentItem="currentItem" />

  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPatientListRequest } from '@/services/patient'
import PatientDetail from './PatientDetail.vue'
import { showToast } from 'vant';
const patientList = ref<any[]>([])
const currentItem = ref<any>({})
const popupRef = ref<any>(null)

const getPatientList = async () => {
  const res = await getPatientListRequest()

  patientList.value = res.data
}
getPatientList()

// 显示弹出层
const showPoppup = () => {
  if (patientList.value.length === 6) {
    showToast('患者信息最多添加6个')
    return
  }
  currentItem.value ={}
  popupRef.value.openPopup()
}
// 编辑
const editPatient = (item:any) => {
  currentItem.value = item
  popupRef.value.openPopup()
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
}</style>
