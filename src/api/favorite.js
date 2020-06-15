// 课程收藏
import instance from '@/plugin/axios'

//分页查询课程收藏
export function queryCourseFavorite (params) {
  return instance({
    url: '/cms/course/favorite/page',
    method: 'get',
    params: params
  })
}
//取消收藏
export function deleteCourseFavorite (params) {
  return instance({
    url: '/cms/course/favorite/delete',
    method: 'post',
    data: params
  })
}


