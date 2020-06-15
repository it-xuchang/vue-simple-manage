import instance from "@/plugin/axios";
//分页查询
export function page(param) {
  return instance({
    url: "/ums/teacher/page",
    method: "get",
    params: param
  });
}
//切换状态
export function changeStatus(param) {
  return instance({
    url: "/ums/teacher/change/status",
    method: "post",
    data: param
  });
}
//修改用户角色
export function editTeacherRole(param) {
  return instance({
    url: "/ums/user/role/edit",
    method: "post",
    data: param
  });
}
//查询所有角色
export function queryRole(param) {
  return instance({
    url: "/ums/role/query",
    method: "get",
    params: param
  });
}
