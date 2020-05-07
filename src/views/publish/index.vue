<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">{{$route.query.id ? '修改文章' : '发布文章'}}</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="publish-form" :model="article" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            height="320"
            placeholder="请输入文章内容"
          >
          </el-tiptap>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发布</el-button>
          <el-button @click="onPublish(true)">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  addArticle,
  getArticle,
  editArticle
} from '@/api/article'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TextColor,
  FormatClear,
  TextAlign,
  Indent,
  LineHeight,
  Preview,
  Image,
  Fullscreen
} from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
import { unploadImages } from '@/api/image'

export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline(),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TextColor(),
        new FormatClear(),
        new TextAlign(),
        new Indent(),
        new LineHeight(),
        new Preview(),
        new Image({
          unploadRequest(file) {
            const fd = new FormData()
            console.log(file)
            fd.append('image', file)
            return unploadImages(fd).then(res => {
              console.log(res)
              return res.data.data.url
            })
          }
        }),
        new Fullscreen()
      ],
      article: {
        title: '',
        content: '',
        cover: {
          type: 0, // 封面类型
          images: []
        },
        channel_id: null
      },
      // 表单验证规则
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'blur' }
        ],
        content: [
          {
            // 自定义校验规则
            validator(rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请填写文章内容'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请填写文章内容', trigger: 'change' }
        ]
      },
      channels: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()

    // 如果路由中带有id 则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    // 发布文章
    onPublish(draft = false) {
      this.$refs['publish-form'].validate(valid => {
        // 验证失败 阻止提交
        if (!valid) {
          return
        }
        // 验证成功 提交表单
        // 判断是请求编辑内容还是直接发布内容
        if (this.$route.query.id) {
          editArticle(this.$route.query.id, this.article, draft).then(res => {
            // console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            this.$router.push('/article')
          })
        } else {
          addArticle(this.article, draft).then(res => {
            // console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            this.$router.push('/article')
          })
        }
      })
    },
    // 获取频道
    loadChannels() {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    // 获取指定文章内容
    loadArticle() {
      // console.log(111)
      getArticle(this.$route.query.id).then(res => {
        // console.log(res)
        this.article = res.data.data
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="less">

</style>
