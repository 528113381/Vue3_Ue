<template>
  <div>
    <cp-nav-bar rtext="注册" />
    <div class="login">
      <div class="login-header">
        <div class="login-header-1">{{ isPassword ? '密码登录' : '短信验证码登录' }}</div>
        <div class="login-header-2" @click="isPassword = !isPassword">{{ isPassword ? '短信验证码登录' : '密码登录' }} <van-icon
            name="arrow" /></div>
      </div>
      <div class="login-form">
        <van-form @submit="onSubmit" @failed="onFailed">
          <van-cell-group inset>
            <van-field v-model="mobile" name="mobile" clearable placeholder="请输入手机号"
              :rules="[{ pattern, message: '请输入正确的手机号' }]" />
            <van-field v-if="isPassword" v-model="password" name="password" type="password"
              placeholder="请输入密码" :rules="[
                { required: true, message: '请输入密码' },
                { pattern: /^\S{8,24}$/, message: '密码必须为8-24位' }
              ]" >
              <template #button >
                <cp-icon @click="isOpen = !isOpen" :name="`login-eye-${isOpen ? 'on' : 'off'}`" />
              </template>  
            </van-field>
            <van-field v-else v-model="code" placeholder="请示输入验证码" :rules="[
              { required: true, message: '请输入验证码' },
              { pattern: /^\d{6}$/, message: '验证码必填' }
            ]">
              <template #button>
                <van-button :disabled="count > 0" size="small" type="primary" @click="getCode">
                  {{ count <= 0 ? '发送验证码' : `${count}s后再次发送` }} </van-button>
              </template>

            </van-field>

            <van-checkbox v-model="checked" icon-size="12px">
              <span>我已同意</span>
              <span class="my-main-color">用户协议</span>
              <span>及</span>
              <span class="my-main-color">隐私协议</span>
            </van-checkbox>
          </van-cell-group>
          <div style="padding: 10px 30px 20px 30px;">
            <van-button :disabled="!checked" round block type="primary" native-type="submit">
              登 录
            </van-button>
          </div>
        </van-form>
      </div>
      <div style="padding-left: 30px">忘记密码?</div>
      <div class="login-bottom">
        <div>第三方登录</div>
        <div class="login-qq">
          <cp-icon name="login-qq"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts" name="LoginCom" >
import { ref } from 'vue'
import { loginRequest, getCodeRequest, loginByCodeRequest } from '@/services/user'
import { userStore } from '@/stores';
import { showToast } from 'vant';
import 'vant/es/toast/style';
import { useRouter } from 'vue-router';
import useClipboard from "vue-clipboard3";

const { toClipboard } = useClipboard();
const Router = useRouter()
const pattern = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
const mobile = ref('13230000003')
const password = ref('abc12345')
const checked = ref(false)
const code = ref('')
const isPassword = ref(true)
const count = ref(0)
const isOpen = ref(false)

const store = userStore()

const onFailed = (errorInfo: any) => {
  console.log('校验失败', errorInfo);

}
const onSubmit = async () => {
  let res: any = null
  // 判断是验证码登录还是密码登录
  if (isPassword.value) {
    // 密码登录
    res = await loginRequest({
      mobile: mobile.value,
      password: password.value
    })
  } else {

    // 验证码登录
    res = await loginByCodeRequest({
      mobile: mobile.value,
      code: code.value

    })
  }
  // 保存用户信息到pinia
  store.setUser(res.data)
  // 登录成功提示

  showToast('登录成功')
  // 路由跳转
  Router.push('/user')
}

const getCode = async () => {
  count.value = 6
  let timer: any = null
  timer = setInterval(() => {
    count.value--
    if (count.value === 0) {
      clearInterval(timer)
    }
  }, 1000)
  const res = await getCodeRequest({
    mobile: mobile.value,
    type: 'login'
  })
  console.log(res)
  toClipboard(res.data.code)

}
</script>
<style lang="scss">
.login {
  .login-header {
    padding: 30px 30px 50px 30px;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    &-1 {
      font-size: 23px;
    }

    &-2 {
      font-size: 15px;
    }
  }

  &-form {
    .van-checkbox {
      padding: 16px 14px;
    }
  }

  &-bottom {
    margin-top: 100px;
    text-align: center;
    color: var(--cp-dark);
  }
}
.login-qq{
  margin-top: 15px;
  font-size: 40px;
}
</style>