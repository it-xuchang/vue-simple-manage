import instance from "@/plugin/axios";
//查询课程分类
export function queryCourseCategory(params) {
  return instance({
    url: '/cms/category/query',
    method: 'get',
    params: params
  })
}
//添加课程
export function addCourse(param) {
  return instance({
    url: '/cms/base/course/add',
    method: 'post',
    data: param
  })
}
export function queryCourse(params) {
  return instance({
    url: '/cms/base/course/query',
    method: 'get',
    params: params
  })
}
//改变状态
export function changeStatus(param) {
  return instance({
    url: '/cms/base/course/change/status',
    method: 'post',
    data: param
  })
}

//查询教学计划
export function queryTeachplan(params) {
  return instance({
    url: '/cms/techplan/query',
    method: 'get',
    params: params
  })
}
//添加教学计划
export function addTeachplan(param) {
  return instance({
    url: '/cms/techplan/add',
    method: 'post',
    data: param
  })
}
export function editTeachplan(param) {
  return instance({
    url: '/cms/techplan/edit',
    method: 'post',
    data: param
  })
}
export function deleteTeachplan(param) {
  return instance({
    url: '/cms/techplan/delete',
    method: 'post',
    data: param
  })
}
export function editCourse(param) {
  return instance({
    url: "/cms/base/course/edit",
    method: "post",
    data: param
  });
}
