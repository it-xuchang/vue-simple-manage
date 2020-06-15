// 课程分类
import instance from '@/plugin/axios'

//查询首页广告栏
export function querySystemNav () {
  return instance({
    url: '/cms/system/nav/query',
    method: 'get'
  })
}
export function addCategory(param) {
  return instance({
    url: "/cms/category/add",
    method: "post",
    data: param
  });
}
