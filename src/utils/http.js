import axios from 'axios'
import { Promise } from 'es6-promise'
import qs from 'qs'
import { notification } from 'antd'

export const postHeader = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
const CancelToken = axios.CancelToken
let CancelAxiosRequest
// axios 配置
axios.defaults.timeout = 30000 // 设置超时时间
axios.defaults.baseURL = `${window.SERVER}/api` // 这是调用数据接口
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.interceptors.request.use(
  config => {
    //  config.data = JSON.stringify(config.data);
    //  config.data = qs.stringify(config.data);
    // config.headers = {
    //   'Content-Type': 'application/json;charset=utf-8', // 设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
    //   //'Content-Type': 'application/x-www-form-urlencoded',
    // }
    config.cancelToken = new CancelToken(function executor(c) {
      // An executor function receives a cancel function as a parameter
      CancelAxiosRequest = c
    })
    const token = sessionStorage.getItem('token') // 获取存储在本地的token
    if (token) {
      // 如果有token 认为是 admin 用户 ，如果没有 那是 前台用户
      config.headers.Authorization = `Bearer ${token}` // 携带权限参数
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// http response 拦截器（所有接收到的请求都要从这儿过一次）
axios.interceptors.response.use(
  response => {
    if (response.data.status !== 0) {
      notification.error({ message: response.data.message })
      return Promise.reject(response)
    }
    return response
  },
  error => {
    if (error.response.data.status && error.response.data.status.toString().startsWith('4')) {
      if (error.response.data.title) error(error.response.data.title)
      // message.error(error.response.data.detail);
      return Promise.reject(error.response.data)
    }
    if (error.response.data.status && error.response.data.status.toString().startsWith('5')) {
      error(`服务器错误，${error.response.data.detail || '请联系开发人员'}`)
      // message.error("服务器错误，"+(error.response.data.detail||"请联系开发人员"));
      return Promise.reject(error.response.data)
    }
  }
)

export { CancelAxiosRequest }

export default axios
/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        paramsSerializer(params) {
          return qs.stringify(params, { arrayFormat: 'repeat', allowDots: true })
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, params)
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}, params = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data, params).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}
/**
 * delete 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}
