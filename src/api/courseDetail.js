// 课程详情
import instance from '@/plugin/axios'

//课程详情页面的所有数据
export function queryCourseAllDetail(params) {
  return instance({
    url: '/cms/base/course/query/course/all/detail',
    method: 'get',
    params:params
  })
}

//添加课程
export function addLearningCourse(data) {
  return instance({
    url: '/cms/learning/course/add',
    method: 'post',
    data: data
  })
}
//添加收藏
export function addFavoriteCourse(data) {
  return instance({
    url: '/cms/course/favorite/add',
    method: 'post',
    data: data
  })
}
//查询课程目录
export function queryCourseTeachplan(params) {
  return instance({
    url: '/cms/base/course/query/course/all/detail',
    method: 'get',
    params:params
  })
}
//加入学习
export function joinLearningCourse(data) {
  return instance({
    url: '/cms/learning/teachplan/join',
    method: 'post',
    data: data
  })
}
