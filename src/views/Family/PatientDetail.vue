<template>
  <div>
    <van-popup
      v-model:show="showRight"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <cp-nav-bar
        title="添加患者"
        rtext="保存"
        :leftfn="closePopup"
        :rightfn="save"
      />
      <van-form @submit="onSubmit">
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
    </van-popup>

  </div>
  <!-- <test-model :msg="msg" @update="msg = $event"></test-model> -->
  <!-- <test-model v-model="msg"></test-model> -->
  <!-- <test-model v-model:count="count" v-model:msg="msg"></test-model> -->
</template>

<script setup lang="ts">

import { ref, computed } from 'vue'
// 测试
// import TestModel from './TestModel.vue';
// const msg = ref("你好")
// const count = ref(666)

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
//保存患者信息
const save = () => {
  console.log('666');

}

const formDetail = ref<any>({
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 1,
})


// 校验规则
const patternChinese = /^(?:[\u4e00-\u9fa5·]{2,16})$/
const patternIdCard = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
const nameRules = ref<any[]>([
  { required: true, message: '请输入真实姓名' },
  { pattern: patternChinese, message: '请输入正确的姓名' }
])
const idCardRules = ref<any[]>([
  { required: true, message: '请输入身份证号码' },
  { pattern: patternIdCard, message: '请输入正确的身份证号码' }
])

const onSubmit = () => { }
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