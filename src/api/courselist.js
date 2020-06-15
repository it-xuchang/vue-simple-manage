import instance from "@/plugin/axios";

//分页查询课程
export function queryCourse(param) {
  return instance({
    url: '/cms/base/course/page',
    method: 'get',
    params: param
  })
}

//查询课程
export function queryCourseDetail(param) {
  return instance({
    url: '/cms/base/course/query',
    method: 'get',
    params: param
  })
}
//查询常见问题
export function queryFrequentlyAskedQuestion(param) {
  return instance({
    url: '/cms/frequently/asked/question/page',
    method: 'get',
    params: param
  })
}
//添加常见问题
export function addFrequentlyAskedQuestion(param) {
  return instance({
    url: '/cms/frequently/asked/question/add',
    method: 'post',
    data: param
  })
}
//编辑常见问题
export function editFrequentlyAskedQuestion(param) {
  return instance({
    url: '/cms/frequently/asked/question/edit',
    method: 'post',
    data: param
  })
}

//删除常见问题
export function deleteFrequentlyAskedQuestion(param) {
  return instance({
    url: '/cms/frequently/asked/question/delete',
    method: 'post',
    data: param
  })
}
//查询课堂问答
export function queryCourseQuzi(param) {
  return instance({
    url: '/cms/course/quzi/page',
    method: 'get',
    params: param
  })
}
//添加课堂问答
export function addCourseQuzi(param) {
  return instance({
    url: '/cms/course/quzi/add',
    method: 'post',
    data: param
  })
}
//编辑课堂问答
export function editCourseQuzi(param) {
  return instance({
    url: '/cms/course/quzi/edit',
    method: 'post',
    data: param
  })
}
//删除课堂问答
  export function deleteCourseQuzi(param) {
    return instance({
      url: '/cms/course/quzi/delete',
      method: 'post',
      data: param
    })
  }

//删除课程
export function deleteCourse(param) {
  return instance({
    url: '/cms/base/course/delete',
    method: 'post',
    data: param
  })
}
