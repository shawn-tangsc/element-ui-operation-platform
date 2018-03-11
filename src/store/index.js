/**
 * Created by tangsicheng on 2018/2/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import page from './page/';
import menu from './menu/';
// import * as actions from './actions'
// // * 表示将 './actions'模块中的所有接口挂载到actions对象上  as 表示别名的意思
// import * as mutations from './mutations'
// import * as getters from './getters'
// import state from './rootState'
Vue.use(Vuex)


const state = {
  user:{}
}

const mutations = {
  isLogin (state, user) {
    console.log("user<<"+user)
    state.user = user
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  modules:{
    page,
    menu
  }
})
export default store
