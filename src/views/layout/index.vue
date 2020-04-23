<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <app-aside class="aside-meun"></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i class="el-icon-s-fold"></i>
          <span class="company-name">全职高手之巅峰荣耀</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  data () {
    return {}
  },
  components: {
    AppAside
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
  .layout-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .aside {
    background: #002033;
    .aside-meun {
      background: #002033;
      height: 100%;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #333;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-icon-s-fold {
    font-size: 24px;
    vertical-align: middle;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    .avatar-wrap {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        background: #000;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
    .company-name {
      margin-left: 8px;
    }
  }
</style>
