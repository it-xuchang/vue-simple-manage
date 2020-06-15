import instance from "@/plugin/axios";
//分页查询
export function page(param) {
  return instance({
    url: "/ums/user/page",
    method: "get",
    params: param
  });
}
//切换状态
export function changeStatus(param) {
  return instance({
    url: "/ums/user/change/status",
    method: "post",
    data: param
  });
}
