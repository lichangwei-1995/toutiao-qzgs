import Vue from 'vue'
import VueRouter from 'vue-router'
// login登录页
import Login from '@/views/login/'
// home首页
import Home from '@/views/home/'
import Layout from '@/views/layout/'

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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
