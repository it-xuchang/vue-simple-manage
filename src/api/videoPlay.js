// 视频播放
import instance from '@/plugin/axios'

//查询教学计划
export function queryTeachplan(params) {
  return instance({
    url: '/cms/techplan/query',
    method: 'get',
    params: params
  })
}
//课程详情页面的所有数据
export function queryCourseAllDetail (params) {
  return instance({
    url: '/cms/base/course/query/course/all/detail',
    method: 'get',
    params:params
  })
}

export function addCourseAssessment(param) {
  return instance({
    url: "/cms/course/assessment/add",
    method: "post",
    data: param
  });
}


