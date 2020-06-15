// 首页
import instance from '@/plugin/axios'

//查询课程分类
export function queryCourseCategory (params) {
  return instance({
    url: '/cms/category/query',
    method: 'get',
    params: params
  })
}
export function pageCourse(params) {
  return instance({
    url: '/cms/base/course/page',
    method: 'get',
    params: params
  })
}


