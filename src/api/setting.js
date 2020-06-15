// 用户设置
import instance from '@/plugin/axios'

//查询学生用户详情
export function queryUserDetail(params) {
  return instance({
    url: '/ums/user/query',
    method: 'get',
    params: params
  })
}
//修改学生用户详情
export function editUserDetail(params) {
  return instance({
    url: '/ums/user/edit',
    method: 'post',
    data: params
  })
}
//查询教师用户详情
export function queryTeacherDetail(params) {
  return instance({
    url: '/ums/teacher/query',
    method: 'get',
    params: params
  })
}
//修改教师用户详情
export function editTeacherDetail(params) {
  return instance({
    url: '/ums/teacher/edit',
    method: 'post',
    data: params
  })
}
