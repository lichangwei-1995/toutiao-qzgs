<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">粉丝管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'fansIndex',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
}
</script>

<style scoped lang="less">

</style>
