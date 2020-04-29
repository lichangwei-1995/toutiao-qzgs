<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">评论管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="articles"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
        >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          prop="comment_status"
          label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '正常' : '关闭' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              :disabled="scope.row.statusDisabled"
              @change="onStatusChange(scope.row)"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 数据分页 -->
      <el-pagination
        class="article-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 25, 50, 100]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  getArticles,
  changeArticleStatus
} from '@/api/article'

export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: [], // 文章数据列表评论
      totalCount: 0, // 数据总数目
      pageSize: 10,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    handleSizeChange() {
      this.loadArticles(1)
    },
    handleCurrentChange(page) {
      // console.log(page)
      this.loadArticles(page)
    },
    // 获取评论列表
    loadArticles(page = 1) {
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        // console.log(res)
        const { results } = res.data.data
        results.forEach(article => {
          article.statusDisabled = false
        })
        this.articles = results
        this.totalCount = res.data.data.total_count
      })
    },
    // 修改评论状态
    onStatusChange(article) {
      // console.log(article.comment_status)
      article.statusDisabled = true
      changeArticleStatus(article.id.toString(), article.comment_status).then(res => {
        // console.log(res)
        article.statusDisabled = false
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}成功`
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .article-pagination {
    margin-top: 15px;
  }
</style>
