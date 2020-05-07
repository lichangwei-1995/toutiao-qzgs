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
            ref="form"
            :model="form"
            label-width="80px"
          >
            <el-form-item label="编号">
              <el-input v-model="user.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="user.mobile" disabled></el-input>
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
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
      width="30%"
      >
      <img
        width="200"
        :src="previewImage"
        alt=""
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserProfile
}
  from '@/api/user'

export default {
  name: 'SettingsIndex',
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {},
      dialogVisible: false,
      previewImage: ''
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
        console.log(res)
        this.user = res.data.data
      })
    },
    // 上传图片
    onChangeFile() {
      // console.log(111)

      const file = this.$refs.file

      const blobData = window.URL.createObjectURL(file.files[0])

      this.previewImage = blobData

      this.dialogVisible = true

      // 防止选择相同图片时不触发change事件问题
      this.$refs.file.value = ''
    },
    onSubmit() {
      console.log('submit!')
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
</style>
