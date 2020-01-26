import axios from 'axios'
// 配置一些基本参数
const instance = axios.create({
  baseURL: 'http://127.0.0.1:10001'
})

export default instance // 记得导出
