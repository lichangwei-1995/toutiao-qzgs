<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">素材管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="padding-bottom: 20px;">
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="10">
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="1">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="cover">
          </el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="1">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="cover">
          </el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="1">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="cover">
          </el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="1">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="cover">
          </el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="1">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="cover">
          </el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="1">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="cover">
          </el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="1">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="cover">
          </el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="1">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="cover">
          </el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="1">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="cover">
          </el-image>
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="1">
          <el-image
            style="height: 100px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            :fit="cover">
          </el-image>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      radio1: '全部'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
