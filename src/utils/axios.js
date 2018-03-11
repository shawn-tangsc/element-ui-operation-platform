/**
 * Created by tangsicheng on 2018/2/22.
 */
import axios from 'axios'
import qs from 'qs'
import extend from 'node.extend'
import evnConfig from '../../config/config'
import router from '../router'

process.env.NODE_ENV === 'development'&& require('mock/mock.js')

// import * as _ from '../util/tool'

// axios 配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  // _.toast("错误的传参", 'fail');
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  // _.toast("网络异常", 'fail');
  //todo 这里要做如果是401的话的跳转判断
  // if (error.response) {
  //   switch (error.response.status) {
  //     case 401:
  //       // 401 清除token信息并跳转到登录页面
  //       store.commit(types.LOGOUT);
  //       router.replace({
  //         path: 'login',
  //         query: {redirect: router.currentRoute.fullPath}
  //       })
  //   }
  // }
  // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
  return Promise.reject(error)
})

// export function fetch (url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, params)
//       .then(response => {
//         resolve(response.data)
//       }, err => {
//         reject(err)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

export function fetch (config) {

  let defaultParams = {
    url: '',
    method: 'GET',
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    responseType: 'text',
    params: {},
    data: {},
    timeout: 5000,
    baseURL: evnConfig.basePath
  }
  return new Promise((resolve, reject) => {
    config = extend(true, defaultParams, config)
    axios(config)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/**
 * 发送formdata
 * todo！！！
 * 这里注意！axios发送formData会有一定的问题，导致后台获取不到formdata，之后有时间客户把这个问题解决一下。
 */

export const sandFormData = (formData,info)=>{

  let defaultParams = {
    url:'',
    baseURL: evnConfig.basePath,
    onProgress: function(e){
      "use strict";

    }
  }
  info = extend(true, defaultParams, info)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    if (xhr.upload) {
      console.log('xhr.upload');
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
          console.log(e.percent);
        }
        info.onProgress(e);

      };
    }
    xhr.onerror = function error(e) {
      reject(e);
    };

    xhr.onload = function onload() {
      console.log(xhr);
      resolve(getBody(xhr));
    };
    xhr.open("POST", `${info.baseURL+info.url}`);
    xhr.send(formData);
  })
}
/**
 * 获取xhr response
 * @param xhr
 * @returns {string|null|string|*}
 */
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
//
export default {
  /**
   * 用户登录
   */
  login (params) {
    let config = {
      url:'/login',
      data:params
    }
    return fetch(config)
  },
  getVersion () {
    "use strict";
    let config = {
      url:'/app/getVersions'
    }
    return fetch(config)
  },
  uploadFile (formdata,config) {
    "use strict";

    return sandFormData(formdata,config)

  },
  getClentInfos () {
    "use strict";
    let config = {
      url:'/app/getClientInfos'
    }
    return fetch(config)
  }
}
