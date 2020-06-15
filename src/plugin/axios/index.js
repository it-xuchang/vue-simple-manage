import axios from 'axios'
import { Message } from 'element-ui'    //引入 element-ui 的 Message 模块，用于信息提示
import router from '../../../src/router'
// 配置一些基本参数
// 允许携带cookie
const instance = axios.create({
  //接口页面
  baseURL: 'http://localhost:10001',
  // baseURL: 'http://api.netlearning.com',
  withCredentials: true
});

// 如果你用了token之类的应该这里也要写个请求拦截，在请求之前把token数据加到请求头之类的。。。。
instance.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理,这里就可以把你的token处理一下
    const token = JSON.parse(localStorage.getItem("token"))
    if(token != null || token != ''){
      // 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
      config.headers['token'] = token
    }
    return config
  },
  error => {
    // 发送失败
    return Promise.reject(error)
  }
)

// 这里用于拦截响应
instance.interceptors.response.use(
  function(response) {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }

    return response;
  },
  function(error) {
    switch (error.response.status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        router.replace({
          path: "/login",
          query: { redirect: router.currentRoute.fullPath }
        });

        Message({
          message: '登录超时，请重新登录',
          duration: 1500,
          forbidClick: true
        });
        break;
      case 403:
        Message({
          message: '用户权限不足',
          duration: 1500,
          forbidClick: true
        });
        break;
      case 404:
        Message({
          message: '访问路径不存在',
          duration: 1500,
          forbidClick: true
        });
        break;
      case 500:
        Message({
          message: '网络请求超时',
          duration: 1500,
          forbidClick: true
        });
        break;
      // 其他错误，直接抛出错误提示
      default:
        Message({
          message: error.response.data.message,
          duration: 1500,
          forbidClick: true
        });
    }
    return Promise.reject(error);
  }
);

export default instance; // 记得导出
