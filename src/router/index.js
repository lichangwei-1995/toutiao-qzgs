import Vue from 'vue'
import VueRouter from 'vue-router'
// login登录页
import Login from '@/views/login/'
// home首页
import Home from '@/views/home/'
import Layout from '@/views/layout/'
// 内容管理
import Article from '@/views/article/'
// 发布文章
import Publish from '@/views/publish/'
// 素材管理
import Fodder from '@/views/fodder/'
// 评论管理
import Comment from '@/views/comment/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/fodder',
        name: 'fodder',
        component: Fodder
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
