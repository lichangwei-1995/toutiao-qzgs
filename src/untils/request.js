// 基于axios封装的模块

import axios from 'axios'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', // 请求的基础路径

  // 定义后端返回原始数据的处理
  // 替代之前axios内部的json.parse处理方式
  transformResponse: [function (data) {
    try {
      // 转换成功直接把结果返回给请求使用
      return JSONbig.parse(data)
    } catch (err) {
      // 转换不成功直接把原来的数据返回给请求使用
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  // 所有请求都会经过这里
  function (config) {
    console.log(config)
    // 统一设置token
    const user = JSON.parse(window.localStorage.getItem('user'))

    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  // 请求失败会经过这里
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器

// 导出请求方法
export default request

//
