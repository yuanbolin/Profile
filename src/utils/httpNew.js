/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request'
import { error as errorNotify } from '@/utils/NotificationUtils'
import { notification } from 'antd'
import { Promise } from 'es6-promise'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error
  const errortext = codeMessage[response.status] || response.statusText
  const { status, url } = response

  errorNotify({
    message: `请求错误 ${status}: ${url}`,
    description: errortext
  })
}

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  // 'timeout' 指定请求超时的毫秒数（0 表示无超时时间）
  // 如果请求超过了 'timeout' 时间，请求将被中断并抛出请求异常
  timeout: 10000,
  // ’prefix‘ 前缀，统一设置 url 前缀
  // ( e.g. request('/user/save', { prefix: '/api/v1' }) => request('/api/v1/user/save') )
  prefix: `${window.SERVER}/api/`,
  // ’ttl‘ 缓存时长（毫秒）， 0 为不过期
  ttl: 60000,
  headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
})

// 提前对响应做异常处理
request.interceptors.response.use(response => {
  if (response.data.status !== 0) {
    errorNotify({ message: response.data.message })
    return Promise.reject(response)
  }
  return response
})

export default request
