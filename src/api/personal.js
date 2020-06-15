// 课程中心-我的课程
import instance from '@/plugin/axios'

//分页查询课程收藏
export function queryPersonCourse(params) {
  return instance({
    url: '/cms/learning/course/person/course/page',
    method: 'get',
    params: params
  })
}



