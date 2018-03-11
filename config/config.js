/**
 * Created by tangsicheng on 2018/3/3.
 */
module.exports = {
  basePath:{'production':'http://localhost:3001',
            'development':'http://localhost:3001'}[process.env.NODE_ENV]
}
