import instance from "@/plugin/axios";
//分页查询
export function page(param) {
  return instance({
    url: "/ums/role/page",
    method: "get",
    params: param
  });
}
export function addRole(data) {
  return instance({
    url: "/ums/role/add",
    method: "post",
    data: data
  });
}
export function editRole(data) {
  return instance({
    url: "/ums/role/edit",
    method: "post",
    data: data
  });
}
export function deleteRole(data) {
  return instance({
    url: "/ums/role/delete",
    method: "post",
    data: data
  });
}
export function queryRoleMenu(param) {
  return instance({
    url: "/ums/role/menu/query",
    method: "get",
    params: param
  });
}
export function roleMenuTree(param) {
  return instance({
    url: "/ums/role/menu/tree",
    method: "get",
    params: param
  });
}
export function editRoleMenu(param) {
  return instance({
    url: "/ums/role/menu/edit",
    method: "post",
    data: param
  });
}
export function treeMenu(param) {
  return instance({
    url: "/ums/menu/tree",
    method: "get",
    params: param
  });
}
