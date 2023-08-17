import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-tokens'
export const serverURL = 'https://questionnaire-mock-two.vercel.app'
const instance = axios.create({
  timeout: 10 * 1000,
})

// 请求拦截，带上token
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截，统一处理error msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResDataType
  const { errno, data, msg } = resData
  if (errno != 0) {
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: ResDataType
}

export type ResDataType = {
  [key: string]: any
}
