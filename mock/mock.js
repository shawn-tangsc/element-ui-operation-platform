/**
 * Created by tangsicheng on 2018/2/24.
 */
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

Mock.mock(devPath+'/login', 'get', login);
