// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/axios'
import * as mUtils from '@/utils/mUtils'
Vue.prototype.$ajax = axios
Vue.use(ElementUI)
Vue.config.productionTip = false



//这里要从浏览器的localStorage里获取，vuex中的store每当刷新浏览器后，就会消失。

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    localStorage.removeItem('userinfo')
    localStorage.removeItem('menuData')
    // store.commit('ADD_MENU', [])
    next();
  }else {
    let user = JSON.parse(localStorage.getItem('userinfo'))
    if (!isEmptyObject(user)) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}// 将跳转的path作为参数，登陆成功后直接跳转到目标页面。
      })
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

function isEmptyObject (obj) {
  for (var key in obj) {
    return false
  }
  return true
}
