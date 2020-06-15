import instance from "@/plugin/axios";
//查询所有角色
export function queryRole(param) {
  return instance({
    url: "/ums/role/query",
    method: "get",
    params: param
  });
}
//添加教师
export function addTeacher(param) {
  return instance({
    url: "/ums/teacher/add",
    method: "post",
    data: param
  });
}
