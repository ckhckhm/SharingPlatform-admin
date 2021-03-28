import request from '@/utils/request'

export function pagination() {
    return request({
      url: '/sp-marketing/marketing/findPage',
      method: 'post'
    })
}