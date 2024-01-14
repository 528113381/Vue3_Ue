<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊" />
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img
        class="img"
        src="@/assets/avatar-doctor.svg"
      />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">
          请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
        </p>
        <p class="safe">
          <cp-icon name="consult-safe" /><span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <van-field
        v-model="form.illnessDesc"
        type="textarea"
        rows="3"
        autosize
        maxlength="200"
        placeholder="请详细描述您的病情，病情描述不能为空"
        show-word-limit
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn
          :list="timeOptions"
          v-model="form.illnessTime"
        ></cp-radio-btn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn
          :list="flagOptions"
          v-model="form.consultFlag"
        ></cp-radio-btn>
      </div>
      <div class="item item-img">
        <van-uploader
          upload-text="上传图片"
          upload-icon="photo-o"
          v-model="fileList"
          multiple
          :after-read="afterRead"
          :max-count="9"
          :max-size="1 * 1024 * 1024"
          @oversize="onOversize"
          preview-size="78px"
          @delete="deleteFile"
        />
        <div
          class="item-img-text"
          v-if="fileList.length === 0"
        >上传内容仅医生课件，最多9张图片，最大5MB</div>
        <!-- <input type="file" ref="inputRef" class="my-upload" @change="fileChange" />
        <van-button type="primary" @click="upload">上传</van-button> -->

      </div>
    </div>
    <div style="margin: 15px;">
      <van-button
        :disabled="disabled"
        round
        type="primary"
        block
        @click="next"
      >下一步</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { IllnessTime, Flag } from '@/enums/index'
import { showToast, showConfirmDialog } from 'vant'
import { uploadRequest } from '@/services/user'
import { useConsult } from '@/stores';
import { useRouter } from 'vue-router';
const router = useRouter()
const store = useConsult()

const fileList = ref<any[]>([])
// // 下面枚举类型，就等价于 字面量类型 + 联合类型
// const c: IllnessTime = 1
// console.log(c);

onMounted(() => {
  if (store.consult.illnessDesc) {
    showConfirmDialog({
      title: '标题',
      message:
        '是否恢复上次填写的内容',
    })
      .then(() => {
        form.value.illnessDesc = store.consult.illnessDesc
        form.value.illnessTime = store.consult.illnessTime
        form.value.consultFlag = store.consult.consultFlag
        form.value.pictures = store.consult.pictures
        fileList.value = store.consult.pictures
      })
      .catch(() => {
        store.clearIllness()
      });
  }
})

const timeOptions = [
  { name: '一周内', id: IllnessTime.Week },
  { name: '一月内', id: IllnessTime.Month },
  { name: '半年以内', id: IllnessTime.HalfAYear },
  { name: '半年以上', id: IllnessTime.Year }
]
const flagOptions = [
  { name: '就诊过', id: Flag.Attendance },
  { name: '没就诊过', id: Flag.NoAttendance }

]

const form = ref<any>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

const afterRead = (e: any) => {
  if (!e.file) return
  e.status = 'uploading'
  e.message = '上传中...'

  // 只要上传文件都需要使用FormData对象
  const formData = new FormData()
  formData.append('file', e.file)
  uploadRequest(formData)
    .then((res) => {
      e.status = 'done'
      e.message = '上传成功'
      e.id = res.data.id
      form.value.pictures.push(res.data)
      console.log(form.value.pictures)
    })
    .catch(() => {
      e.status = 'failed'
      e.message = '上传失败'
    })
}

const onOversize = () => {
  showToast('文件大小不能超过 1MB')
}

const deleteFile = (e: any) => {
  const index = form.value.pictures.findIndex((item: any) => item.id === e.id)
  if (index !== -1) {
    form.value.pictures.splice(index, 1)
  }
}
// const inputRef = ref<any>(null)
// const upload = () => {
//   // 下面代码就是模拟点击 input=file 的那个事件
//   inputRef.value.click()
// }
// const fileChange = (e: any) => {
//   // 工作里面一般在这个里面 实现上传的请求发送
//   console.log(e.target.files)
// }

const disabled = computed(() => {
  if (
    form.value.illnessDesc &&
    form.value.illnessTime !== undefined &&
    form.value.consultFlag !== undefined
  ) {
    return false
  }
  return true
})

const next = () => {
  store.setIllness(form.value)
  router.push('/user/family?isChange=1')
}

</script>


<style lang="scss" scoped>
.consult-illness-page {
  p {
    margin: 0;
  }
}

.illness-tip {
  display: flex;
  padding: 15px;

  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }

  .info {
    flex: 1;
    padding-left: 12px;

    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }

    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }

    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;

      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}

.illness-form {
  padding: 15px;

  .van-field {
    padding: 0;

    &::after {
      border-bottom: none;
    }
  }

  .item {
    >p {
      color: var(--cp-text3);
      padding: 15px 0;
      font-size: 14px;
    }


  }

  .item-img {
    display: flex;
    align-items: center;
    margin-top: 20px;

    .item-img-text {
      font-size: 12px;
      color: var(--cp-tip);
    }
  }


}
</style>