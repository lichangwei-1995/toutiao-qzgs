<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">发布文章</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            height="320"
            placeholder="请输入文章内容"
          >
          </el-tiptap>
        </el-form-item>
        <el-form-item label="频道">
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
          <el-button type="primary" @click="onPublish">发布</el-button>
          <el-button>存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle } from '@/api/article'
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
      channels: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    onPublish() {
      addArticle(this.article).then(res => {
        console.log(res)
      })
    },
    loadChannels() {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
