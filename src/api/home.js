// 首页
import instance from '@/plugin/axios'

//精品推荐-查询热度最高的课程
export function queryCourseRecommendation (params) {
  return instance({
    url: '/cms/base/course/query/course/recommendation',
    method: 'get',
    params: params
  })
}
//课程方向--根据分类统计学生学习量最高的
export function queryRecommendedCourseDirection (params) {
  return instance({
    url: '/cms/base/course/query/recommended/course/direction',
    method: 'get',
    params: params
  })
}
//名师推荐-统计课程热度最高的教师个数
export function queryRecommendationTeacher (params) {
  return instance({
    url: '/ums/teacher/query/teacher/recommendation',
    method: 'get',
    params: params
  })
}
//查询首页广告栏
export function querySystemNav () {
  return instance({
    url: '/cms/system/nav/query',
    method: 'get'
  })
}

//查询课程分类
export function queryCourseCategory (params) {
  return instance({
    url: '/cms/category/query',
    method: 'get',
    params: params
  })
}

//查询学生用户详情
export function queryUserDetail (params) {
  return instance({
    url: '/ums/user/query',
    method: 'get',
    params: params
  })
}
//查询教师用户详情
export function queryTeacherDetail (params) {
  return instance({
    url: '/ums/teacher/query',
    method: 'get',
    params: params
  })
}
