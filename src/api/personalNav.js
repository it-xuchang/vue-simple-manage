// 导入axios实例
import instance from "@/plugin/axios";

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
