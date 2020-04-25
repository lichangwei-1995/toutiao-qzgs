<template>
  <div class="article-container">
    <el-card class="box-card filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">内容管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{totalCount}} 条结果：
      </div>
      <el-table
        :data="articles"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="封面">
          <template slot-scope="scope">
            <img v-if="scope.row.cover.images[0]" class="article-cover" :src="scope.row.cover.images[0]" alt="">
            <img v-else class="article-cover" src="./mbno_img.jpg" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
            <!-- <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2">审核成功</el-tag>
            <el-tag v-else-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
            >
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              >
              </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="onCurrentChange"
        :page-size="pageSize"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
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
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: '' },
        { status: 0, text: '待审核', type: 'info' },
        { status: 0, text: '审核成功', type: 'success' },
        { status: 0, text: '审核失败', type: 'warning' },
        { status: 0, text: '已删除', type: 'danger' }
      ],
      totalCount: 0,
      pageSize: 20,
      value1: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadgetArticles(1)
  },
  mounted () {},
  methods: {
    loadgetArticles(page = 1) {
      getArticles({
        page,
        per_page: this.pageSize
      }).then(res => {
        console.log(res)
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onSubmit() {
      console.log('submit!')
    },

    onCurrentChange(page) {
      this.loadgetArticles(page)
    }
  }
}
</script>

<style scoped lang="less">
  .filter-card {
    margin-bottom: 20px;
  }
  .article-cover {
    height: 100px;
  }
</style>
