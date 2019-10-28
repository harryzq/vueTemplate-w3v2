import Vue from 'vue'
import utils from './common.js'
import VueResource from 'vue-resource'
Vue.use(VueResource)
// import vm from '../main'
const httpLockArr = {} //请求锁，避免同一条请求重复发送

// 请求拦截器
  Vue.http.interceptors.push((request,next)=>{
    let lastRequest = httpLockArr[request.url]
    if (lastRequest) {
      return false
    }else{
      httpLockArr[request.url] = request
    }
    next((Response)=>{
      httpLockArr[request.url] = null
      return Response
    })
  })


// 200 => success
// 200以外 => error
const get = (url, params) => {
  var initOptions = {
    xhr: {
      withCredentials: true,
    }
  }
  params && Object.assign(initOptions, {params})
  return new Promise((resolve, reject) => {
    Vue.http.get(url, initOptions)
      .then(res => {
        resolve(res.body)
      }, res => {
        reject(res.bodyText)
      })
  })
}

const post = (url, options) => {
  var initOptions = {
    xhr: {
      withCredentials: true,
    },
    headers: {
      'X-CSRFToken': utils.getCookie('csrftoken')
    }
  }
  return new Promise((resolve, reject) => {
    Vue.http.post(url, options, initOptions)
    .then(res => {
      resolve(res.body)
    }, res => {
      reject(res.bodyText)
    })
  })
}

export default {
  get,
  post
}
