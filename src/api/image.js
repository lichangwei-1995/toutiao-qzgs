// 上传图片素材

import request from '@/untils/request'

export const unploadImages = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 接口要求上传时请求头中Content-Type参数设置为multipart/form-data
    // axios中不需要设置Content-Type, 只需要给data一个 FormData 对象
    data
  })
}
