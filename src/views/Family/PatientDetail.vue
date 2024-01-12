<template>
  <div>
    <van-popup
      v-model:show="showRight"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <cp-nav-bar
        :title="title"
        :rtext="rightText"
        :leftfn="closePopup"
        :rightfn="onSubmitbth"
      />
      <van-form @submit="onSubmit" ref="submitRef">
        <van-cell-group inset>
          <van-field
            v-model="formDetail.name"
            label="真实姓名"
            name="name"
            placeholder="请填输入真实姓名"
            :rules="nameRules"
          />
          <van-field
            v-model="formDetail.idCard"
            label="身份证号"
            name="idCard"
            placeholder="请输入身份证号"
            :rules="idCardRules"
          />
          <van-field
            name="checkbox"
            label="性别"
          >
            <template #input>
              <cp-radio-btn v-model="formDetail.gender" />
            </template>
          </van-field>
          <van-field
            name="checkbox"
            label="默认就诊人"
          >
            <template #input>
              <van-checkbox v-model="defaultFlagCom" />
            </template>
          </van-field>
        </van-cell-group>
      </van-form>
      <van-action-bar>
        <van-action-bar-button
          v-if="formDetail.id"
          type="danger"
          text="删除"
          color="var(--cp-bg)"
          style="color: #ee0a24;"
          @click="onClickButton"
        />
      </van-action-bar>
    </van-popup>
    

  </div>
  <!-- <test-model :msg="msg" @update="msg = $event"></test-model> -->
  <!-- <test-model v-model="msg"></test-model> -->
  <!-- <test-model v-model:count="count" v-model:msg="msg"></test-model> -->
</template>

<script setup lang="ts">
import idCard from 'idcard'
import { showConfirmDialog, showToast } from 'vant'
import { ref, computed, watch } from 'vue'
import { addPatientRequest, updatePatientRequest, deletePatientRequest } from '@/services/patient'

const emits = defineEmits(['addSuccessEvent'])

// 测试
// import TestModel from './TestModel.vue';
// const msg = ref("你好")
// const count = ref(666)

const submitRef = ref<any>(null)

// 右侧弹出层显示属性
const showRight = ref(false)
// 关闭弹出层
const closePopup = () => {
  showRight.value = false
}

// 打开弹出层
const openPopup = () => {
  showRight.value = true
}
const formDetail = ref<any>({
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 1,
})

const title = ref('添加患者')
const rightText = ref('添加')

const props = defineProps({
  currentItem: {
    type: Object,
    // 新增的时候没有传递这个参数，就用默认值空对象，编辑的使用会传递具体的对象
    default: () => ({})
  }
})
watch(
  () => props.currentItem,
  (newV) => {
    if (newV.id) {
      title.value = '编辑患者'
      rightText.value = '更新'
      formDetail.value.name = newV.name
      formDetail.value.idCard = newV.idCard
      formDetail.value.defaultFlag = newV.defaultFlag
      formDetail.value.gender = newV.gender
      formDetail.value.id = newV.id
    } else {
      title.value = '添加患者'
      rightText.value = '保存'
      formDetail.value.name = ''
      formDetail.value.idCard = ''
      formDetail.value.defaultFlag = 0
      formDetail.value.gender = 0
      delete formDetail.value.id
    }
  },
  { deep: true }
)


// 校验规则
const patternChinese = /^(?:[\u4e00-\u9fa5·]{2,5})$/
// const patternIdCard = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
const validator = (val: any) => {
  return idCard.verify(val)
}
const nameRules = ref<any[]>([
  { required: true, message: '请输入真实姓名' },
  { pattern: patternChinese, message: '请输入正确的姓名' }
])
const idCardRules = ref<any[]>([
  { required: true, message: '请输入身份证号码' },
  // { pattern: patternIdCard, message: '请输入正确的身份证号码' }
  { validator, message: '请输入正确的身份证号码' }
])

const onSubmit = async () => {
  const id = formDetail.value.idCard.slice(-2, -1)
  if (

    (id % 2 === 0 && formDetail.value.gender === 0) ||
    (id % 2 === 1 && formDetail.value.gender === 1)
  ) {
    if (formDetail.value.id) {
      // 编辑
      await updatePatientRequest(formDetail.value)
      formDetail.value.id = null
    } else {
      // 新增
      await addPatientRequest(formDetail.value)
    }

    showRight.value = false
    emits('addSuccessEvent')
  } else {
    showToast('当前选择的性别与身份证号不匹配,请重新检查')
  }
}

const onSubmitbth = ()=>{
  submitRef.value.submit()
}


// 删除患者
const onClickButton = () => {
  showConfirmDialog({
    title: '提示',
    message: '是否确定删除该患者'
  }).then(async () => {
    await deletePatientRequest(formDetail.value.id)
    // 删除成功后关闭弹出层
    showRight.value = false
    emits('addSuccessEvent')
  }).catch(() => {

  })
}
const defaultFlagCom = computed({
  get() {
    console.log('get');
    return formDetail.value.defaultFlag === 0 ? false : true
  },
  set(val) {
    console.log('set', val);
    formDetail.value.defaultFlag = val ? 1 : 0
  }
})

// 暴露函数
defineExpose({
  openPopup: openPopup
})

</script>

<style lang="scss" scoped></style>