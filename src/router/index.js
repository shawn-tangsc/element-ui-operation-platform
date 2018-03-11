import Vue from 'vue'
import Router from 'vue-router'
import {
  login,
  index,
  home,
  updateApp,
  historyVersion
} from 'pages/'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登陆',
      hidden: true,
      component: login
    },
    {
      path: '/',
      hidden: true,
      redirect: '/login'
    },
    {
      path: '/',
      component: home,
      leaf: true,
      iconCls: 'el-icon-star-off',//图标样式class
      children: [
        { path: '/index', component: index, name: '主页'},
      ]
    },
    {
      path: '/',
      component: home,
      name:'客户端版本管理',

      iconCls: 'el-icon-upload2',//图标样式class
      children: [
        { path: '/upload-app', component: updateApp, name: '客户端版本上传'},
        { path: '/history-apps',component: historyVersion, name: 'js更新包版本管理'},
      ]
    }
  ]
})
