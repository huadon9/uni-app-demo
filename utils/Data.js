import axios from '@/tools/axios-uni-app'

// let loading;
import { Common } from './Common'

/**
 * 请求接口日志记录
 */
function _reqlog(req) {
  if (process.env.NODE_ENV === 'development') {
      console.log("请求地址：" + req.url, req.data || req.params)
  }
  //TODO 调接口异步写入日志数据库
}
class Data {
  constructor () {    
    let dev = process.env.NODE_ENV === 'development'
    this.service = {}
    // this.service = axios.create({
    //   baseURL: dev ? '' : 'http://192.168.66.112', // api的base_url 非开发环境暂加上本地host 代理
    //   // baseURL: 'http://192.168.66.112',
    //   timeout: 6000, // 请求超时时间
    //   // #ifdef H5
    //   withCredentials: true,
    //   // #endif
    //   headers: {
    //       'Content-Type': 'application/json',
    //       'X-Requested-With': 'XMLHttpRequest',
    //   },
    // })
    this.service = axios.create({
        baseURL: '',
        timeout: 6000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
        // #ifdef H5
        withCredentials: true,
        // #endif
        headers: {
            'Content-Type': 'application/json',
            //'X-Requested-With': 'XMLHttpRequest',
        },
    })
  }
  static getInstance () {
    if (!this.instance) this.instance = new Data()
    return this.instance
  }
  
  /**
   * @author:POPE
   * @description: 数据请求
   * @param  {} url
   * @param  {} params
   * @param  {} isToken=true
   * @param  {} loadingText='加载中...'
   */
  get (defaultParams = {}) {
    let service = this.service
    let env = process.env
    let params = {
      url: '',
      method: 'post',
      data: {},
      isToken: true,
      xmlHttpRequest: true,
      loadingText: '加载中...'
    }
    Object.assign(params, defaultParams)
    if (params.method === 'GET' || params.method === 'get') {
      params.url = `${params.url}${Common.getInstance().queryParams(
        params.data
      )}`
    }

    service = this.service
    
    // 不是开发环境，全部使用真实接口
    if (env.NODE_ENV !== 'development') {
      if (params.url.indexOf('/upload') > -1) {
        params.url = params.url.replace('/upload', '') // 去除/upload
      } else if (params.url.indexOf('/api') > -1) {
        params.url = params.url.replace('/api', '') // 去除/api
      }
      service = this.service
    }

   
 

    // 每次请求携带cookies信息
    // axios.defaults.withCredentials = true;
    // axios.defaults.crossDomain = true;
    // 创建axios实例

    // 拦截器
    service.interceptors.request.use(
      config => {
        let token = '' // 8711dc985f0d99ce65767d0d6146f49f33aa70f8
        // 在发送请求之前做某事，比如说 设置loading动画显示
        // loading = Loading.service({
        //   fullscreen: true,
        //   text: loadingText,
        //   // target: '#loading',
        //   background: 'rgba(0, 0, 0, 0.3)'
        // });
        // 设置token
        if (uni.getStorageSync('user_info')) { // 同步获取方式
          token = JSON.parse(uni.getStorageSync('user_info')).token
        }
        if (params.isToken && token) {
          // 判断是否存在token和是否需要token，如果存在的话，则每个http header都加上token
          config.headers.token = `${token}`
        }
        if (params.xmlHttpRequest) {
          config.headers.HTTP_X_REQUESTED_WITH = 'xmlhttprequest'
          config.headers['X-Requested-With'] = 'xmlhttprequest'
        }
        // config.headers['Accept-Apims'] = 'api';
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        // if (config.url.indexOf(url) === -1) config.url = url + config.url;/*拼接完整请求路径*/
        _reqlog(config)
        return config
      },
      error => {
        // 请求错误时做些事
        // loading.close();
        return Promise.reject(error)
      }
    )
    service.interceptors.response.use(
      response => {
        // 所有请求完成后都要执行的操作
        // 暂停加载动画
        // loading.close();
        return response
      },
      function (err) {
        if (err.response) {
          switch (err.response.status) {
            case 401:
          }
        }
        return Promise.reject(err)
      }
    )

    return new Promise((resolve, reject) => {
      service({
        url: params.url,
        method: params.method,
        // emulateJSON: true,
        // timeout: 10000,
        data: params.data // Qs.stringify(param) || {}
      })
        .then(res => {
          // loading.close();
          resolve(res)
        })
        .catch(error => {
          // loading.close();
          reject(error)
          uni.hideLoading()
          uni.showModal({
            title: '提示',
            content: `${error}`,
            showCancel: false
          })        
        })
    })
  }
  /**
   * @author:POPE
   * @description:下载
   * @param  {} url
   * @param  {} param
   */
  down (url, param) {
    let query = []
    for (let key in param) {
      query.push(key + '=' + param[key])
    }
    url = url + '?' + query.join('&')
    window.open(url, 'down')
  }
}
export { Data }
