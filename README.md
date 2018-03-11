## 手把手Vue2.0 全家桶 + elements-ui 初始化流程

### 一.前言
* 本文档默认你的所有环境已经ok，这里整理的是如何完整的搭建一个vue2.0全家桶和elements-ui 的搭建流程步骤。

### 二.vue脚手架的初始化
* 首先，我们先使用vue-cli 来简单的构建一个vue项目

	```
		npm install -g vue-cle //全局安装vue-cli
		npm init webpack <yourProjectName> // 生成一个webpack的脚手架项目
		cd <yourProjectName>
		npm install //依赖的初始化
	```

* 执行完上面的操作，你就已经初步得到了一个vue的脚手架工程。
* 其中，新版本的脚手架会询问你是否需要用vue-route，你选是，全家桶中的route文件也就在里面了。

### 三. 脚手架命令的介绍

``` bash

# 在开发的过程中，我们执行以下命令，可以让我们直接在开发的过程中热部署到浏览器上查看效果。
npm run dev

# 如果需要打包出常规的html+css代码，就需要执行下列操作。
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

### 四. 脚手架的目录结构。

```
vue-element-admin:             项目名称
|   .babelrc                   babel的配置文件
|   .editorconfig              编辑器的配置文件
|   .gitignore                 git的忽略文件
|   .postcssrc.js              编译css的工具
|   index.html                 网站主页
|   package.json               项目依赖哪些包的文件
|   README.md                  说明文档
|
+---build                      构建的配置文件夹
|       build.js               项目构建配置入口
|       check-versions.js      版本控制
|       dev-client.js
|       dev-server.js
|       utils.js			        工具类
|       vue-loader.conf.js		 vue编译插件
|       webpack.base.conf.js   webpack基础文件
|       webpack.dev.conf.js	 开发环境webpack执行的特殊文件
|       webpack.prod.conf.js   生产环境webpack执行的特殊文件
|       webpack.test.conf.js
|
+---config                      整体的配置文件夹
|       dev.env.js
|       index.js                配置文件入口
|       prod.env.js
|       test.env.js
|
+---src                         源文件夹
|   |   App.vue                 布局组件
|   |   main.js                 入口文件
|   |
|   +---assets                  静态文件夹
|   |       logo.png
|   |
|   +---components              组件文件夹
|   |       Hello.vue           单个组件
|   |
|   \---router                  路由文件夹
|           index.js            路由主页
|
+---static                      静态文件夹
|       .gitkeep                空文件（Git本身不允许全空目录提交至版本库，一个办法是在目录下创建一个文件，取名为.gitkeep是习惯用法）
|
\---test                        测试文件夹

```


### 五.集成element-ui 可参考[官网](http://element-cn.eleme.io/#/zh-CN/component/quickstart)。
* 添加依赖

	```bash
	npm install element-ui -S
	```
* 引入,在main.js中添加

	```bash
	import ElementUI from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	Vue.use(ElementUI)
	```

### 六.添加sass配置
* 添加依赖

	```
	npm install node-sass --save-dev
	npm install sass-loader --save-dev

	//--save-dev 会将该依赖写入package.json，方便别人安装依赖
	```

* 打开webpack.base.config.js 在loaders里面添加

	```
	{
		test: /\.scss$/,
		loaders: ["style", "css", "sass"]
	}
	```

### 七. 添加Vuex
* 添加依赖

	```
	npm install vuex --save
	```

* 创建vuex相关文件夹及文件

	>在src文件夹下新建store文件夹后，在store文件夹下新建如下文件:
index.js、mutations.js、actions.js、getters.js及rootState.js

* 修改src下的入口文件main.js

	```bash
	...
	import store from './store/index'; //引入store
	...

	/* eslint-disable no-new */
	new Vue({
	  ...
	  store, //挂载store
	  ...
	})
	```
* 最后，根据[vuex官网](https://vuex.vuejs.org/zh-cn/getting-started.html)自行填充新增文件内容。

### 八.集成axios

vue官方人员说，2.0后将不再继续维护vue-resource了，并推荐大家使用 axios 。

* 添加依赖

	```
	npm install axios --save
	```
* 在src下新建一个axios.js文件，可以根据[官网](https://www.npmjs.com/package/axios)填充内容。

* 在main.js中引入axios.js 并且将其绑到vue的原型链上。

	```
	import axios from './axios'
	Vue.prototype.$ajax = axios
	```

* 实际应用

	1. 在axios.js中添加

	```
	export default {
	   /**
	    * 用户登录
	    */
	   Login (params) {
	     return fetch('/post', params)
	   },
	 	...
	  }
	}
	```

	2.

	```
	methods: {
	   login () {
	      let params = {
	          cid: md5(String(new Date().getTime() + Math.random())),
	          email: this.email,
	          password: this.password
	      }
	      this.$ajax.login(params)
	          .then((res) => {
	              // 成功回调
	          }, (res) => {
	              // 失败回调
	          })
	     },
	}
	```

* axios 交互的一些问题可以[参考](https://www.cnblogs.com/lijuntao/p/7423790.html)

### 九.配置mock
我对比了市面上几个不同的mock，包括jsonserver,感觉各有优劣吧，但是从开发的角度来说，mock的作用主要还是作为模拟数据返回、数据校验等一系列的操作，并且不应该占用开发人员太多的时间，所以在这里，我还是选择了简单的mockjs使用方法。

* 一.我们可以先新建一个叫mock的文件夹，在这里可以放我们所有和mock相关的文件。

* 二.引入依赖

	```
	npm install mockjs --save -dev
	```

* 三. 新建一个mock.js文件，代码如下

	```
	const Mock = require('mockjs');

	const devPath = 'http://localhost:3001';
	// 获取 mock.Random 对象

	const Random = Mock.Random;


	const login = (options)=>{
	  "use strict";
	  let body = JSON.parse(options.body);
	  console.log(body);
	  return require('./mock.json')
	  // return {'status':404,statusText:'error'}
	}

	Mock.mock(devPath+'/login', 'get', login);//这样就可以拦截掉你发送的http://localhost:3001/login 的get请求，并且会去执行第三个参数的方法。

	```

* 四，去你之前新建的axios.js最上面中加上这么一段话

	```
	process.env.NODE_ENV === 'development'&& require('mock/mock.js')
	```
	这样你就可以在开发环境中引入mock环境，同时不用担心是否会影响到生产环境了，而且，如果当你不需要在开发环境中引入mock了，那么你只需要注释掉这句话，就可以了。
