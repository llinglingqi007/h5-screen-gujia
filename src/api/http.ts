import axios, { Axios } from 'axios'
import type {InternalAxiosRequestConfig} from 'axios'
import { getToken } from '@/utils/auth'
import { showNotify } from '@nutui/nutui';
import { showToast } from '@nutui/nutui';
interface MyAxiosOptions extends InternalAxiosRequestConfig {
  noNeedToken?: boolean
  noNeedTip?: boolean
}
export function createAxios(options = {}): Axios {
  const service =  axios.create({
    timeout: 6000,
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })
  service.interceptors.request.use((config : MyAxiosOptions) => { 
  // 处理不需要token的请求
    if (config?.noNeedToken) {
      return config
    }
    const token = getToken()
    config.headers.Authorization = config.headers.Authorization || 'ticket ' + token

    return config
  })
  service.interceptors.response.use(response => { 
    const { data, status, config, statusText } = response
    if (![200, 2000].includes(data?.status)) {
      const message = data?.message || statusText
      const code = data?.status || status
      // !config?.noNeedTip && showToast.fail(`[Axios Error]`, message)
      return Promise.reject({ code, message, error: data || response })
    }
    return Promise.resolve(data?.data || data || response)
  },
  error => {
    showToast.fail(error.message, {duration:1000,close:(e:any)=>{console.log(e,'close')}})
  }
  )
  return service
}
export const request = createAxios()
