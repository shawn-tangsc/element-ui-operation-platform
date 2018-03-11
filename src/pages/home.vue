/**
* Created by tangsicheng on 2018/3/1.
*/
<template>

  <el-container class="home-container" >
    <el-header class="home-header" >
      <el-col class="logo">
        <img src="../assets/logo.png" />
        <p > {{collapsed?'':sysName}}</p>
      </el-col>
      <div style="flex: 1;"></div>
      <el-col style="width: auto">
        <el-dropdown trigger="hover" style="height: 100%">
          <span class="el-dropdown-link userinfo-inner" style="color: #fff;display: flex;align-items: center;height: 100%;flex-direction: row-reverse;">
            <img src="../assets/img/avatar-2.jpg"  style="width: 40px; height: 40px; border-radius: 20px;margin-left: 10px;"/>
            {{sysUserName}}
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-col>
    </el-header>
    <el-container class="home-body" >
      <el-aside class="home-menu-container" :class="[collapsed ? 'collapsed' : 'not-collapsed']">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#eef1f6"
                 unique-opened router :collapse="collapsed" >
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu class="home-menu-item" :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title"> {{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item class="home-menu-item" v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container >

        <el-aside class="collapse-div" >
          <div @click="changeCollapse()" style="height: 100%;display: flex;align-items: center;justify-content: center;">
            <i v-if="collapsed" class="el-icon-d-arrow-right" ></i>
            <i v-else class="el-icon-d-arrow-left" ></i>
          </div>
        </el-aside>
        <el-main style="display: flex; flex-direction: column;">

          <el-col :span="24" class="breadcrumb-container" style="margin-bottom: 20px;">
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>

          <router-view></router-view><!--页面渲染入口-->

        </el-main>
      </el-container>
    </el-container>

  </el-container>
</template>

<script type="text/ecmascript-6">
    export default {
        components: {},
        created() {

        },
        data() {
            return {
              sysName:'运营平台',
              collapsed:false,
              sysUserName: 'shawn 唐',
              sysUserAvatar: '',
              form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
              }
            }
        },
        methods: {
          changeCollapse:function () {
              console.log('check')
              this.collapsed = !this.collapsed
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import 'home.scss';

</style>
