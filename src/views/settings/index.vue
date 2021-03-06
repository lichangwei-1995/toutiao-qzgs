<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">个人设置</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form
            ref="settings-form"
            :model="user"
            label-width="80px"
            :rules="rules"
          >
            <el-form-item label="编号">
              <el-input v-model="user.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="user.mobile" disabled></el-input>
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="upDateUserProfileLoading">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" class="avatar-col">
          <el-avatar
            shape="square"
            :size="180"
            :src="user.photo"
          >
          </el-avatar>
          <p @click="$refs.file.click()">点击修改头像</p>
          <input
            type="file"
            ref="file"
            hidden
            @change="onChangeFile"
          >
        </el-col>
      </el-row>
    </el-card>

    <!-- 弹出层 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDialogopen"
      @closed="onDialogclose"
      >
      <div class="preview-image-wrap">
        <img
          class="preview-image"
          :src="previewImage"
          ref="preview-image"
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogVisible = false"
        >
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="onUpDateImage"
          :loading="upDateUserPhotoLoading"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserProfile,
  upDateUserPhoto,
  onUpDateUserProfile
} from '@/api/user'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import globalBus from '@/untils/global-bus'

export default {
  name: 'SettingsIndex',
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: '',
        intro: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {
        name: '',
        intro: ''
      },
      dialogVisible: false,
      previewImage: '',
      cropper: null, // 裁切器
      upDateUserPhotoLoading: false, // 修改头像loading状态
      upDateUserProfileLoading: false,
      // 表单验证
      rules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        intro: [
          { required: true, message: '请输入媒体介绍', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: '请输入正确邮箱格式', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      getUserProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    // 上传图片
    onChangeFile() {
      // console.log(111)

      const file = this.$refs.file

      const blobData = window.URL.createObjectURL(file.files[0])

      this.previewImage = blobData

      // 显示弹出层
      this.dialogVisible = true

      // 防止选择相同图片时不触发change事件问题
      this.$refs.file.value = ''
    },

    onDialogopen() {
      const image = this.$refs['preview-image']
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'move',
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true
        // crop(event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },

    onDialogclose() {
      // 关闭对话框的同时销毁裁切器
      this.cropper.destroy()
    },

    onUpDateImage() {
      // 开启loading状态
      this.upDateUserPhotoLoading = true

      this.cropper.getCroppedCanvas().toBlob((file) => {
        const formData = new FormData()

        formData.append('photo', file)

        upDateUserPhoto(formData).then(res => {
          // console.log(res)
          // 关闭弹出框
          this.dialogVisible = false

          // 本地直接修改
          this.user.photo = window.URL.createObjectURL(file)

          // 需要服务端参与
          // this.user.photo = res.data.data.photo

          // 关闭loading状态\
          this.upDateUserPhotoLoading = false

          this.$message({
            type: 'success',
            message: '修改成功'
          })

          globalBus.$emit('update-user', this.user)
        })
      })
    },

    onSubmit() {
      this.upDateUserProfileLoading = true
      this.$refs['settings-form'].validate(valid => {
        // 验证失败 阻止提交
        if (!valid) {
          this.upDateUserProfileLoading = false
          return
        }

        onUpDateUserProfile(this.user).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.upDateUserProfileLoading = false

          globalBus.$emit('update-user', this.user)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .avatar-col {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .preview-image-wrap {
    .preview-image {
      display: block;
      max-width: 100%;
      height: 200px;
    }
  }
</style>
