<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <span class="title">vue-elements-test</span>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
          <el-form-item prop="username">
            <span class="fa-tips"><i class="fa fa-user"></i></span>
            <el-input class="area" type="text" placeholder="用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span class="fa-tips"><i class="fa fa-lock"></i></span>
            <el-input class="area" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
          <div class="tiparea">
            <p class="wxtip">温馨提示：</p>
            <p class="tip">未登录过的新用户，自动注册</p>
            <p class="tip">注册过的用户可凭账号密码登录</p>
          </div>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
  import * as mUtils from '@/utils/mUtils'
  import {mapActions, mapState,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        },
        showLogin: false,
      }
    },
    mounted(){
      this.showLogin = true
    },
    computed: {
      ...mapGetters(['menuitems','isLoadRoutes'])
    },
    methods: {
      ...mapActions(['addMenu','loadRoutes']),
      generateMenuPushIndex (){

      },
      submitForm(loginForm) {
        this.$refs[loginForm].validate((valid) => {
          if (valid) {
            this.$ajax.login(this.loginForm).then(res => {
              this.$store.commit('isLogin',res.user);
              mUtils.setStore('userinfo',res.user)
              this.generateMenuPushIndex();
              //用户登录的接口
              this.$router.push(this.$route.query.redirect || '/index')
              this.$message({
                type: 'success',
                message: '登录成功'
              });
              this.$store.dispatch('initLeftMenu'); //设置左边菜单始终为展开状态
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '请输入正确的用户名密码',
              offset: 100
            });
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  @import 'login.scss';

</style>
