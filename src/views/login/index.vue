<template>
  <div class="login-container">
    <el-form class="login-form" ref="login-form" :model="user" :rules="rules">
      <el-form-item  prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree" class="login-checked" name="type"></el-checkbox>我已阅读并同意用户条款和隐私条款
      </el-form-item>

      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 密码
      },
      // checked: false,
      loading: false,
      ruleForm: {
        mobile: '',
        code: '',
        agree: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据
      // const user = this.user
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败 停止提交请求
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      // 开启登陆中状态loading
      this.loading = true

      login(this.user).then(res => {
        console.log(res)
        this.$message({
          message: '恭喜你，登陆成功',
          type: 'success'
        })
        // 显示登录消息时关闭loading等待效果
        this.loading = false
        // 将请求返回的数据存储到本地储存中 本地储存只能储存字符串 所以要转成josn格式
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('登陆失败,请检查手机号或验证码')

        // 显示登录消息时关闭loading等待效果
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #999;
  .login-form {
    padding: 50px 60px;
    background-color: #fff;
    .login-btn {
      width: 100%;
    }
    .login-checked {
      margin-right: 12px;
    }
  }
  .el-form-item {
    width: 300px;
  }
}
</style>
