import instance from "@/plugin/axios";
//树形结构
export function tree(param) {
  return instance({
    url: "/ums/menu/tree",
    method: "get",
    params: param
  });
}

export function editMenu(param) {
  return instance({
    url: "/ums/menu/edit",
    method: "post",
    data: param
  });
}

export function addMenu(param) {
  return instance({
    url: "/ums/menu/add",
    method: "post",
    data: param
  });
}

export function deleteMenu(param) {
  return instance({
    url: "/ums/menu/delete",
    method: "post",
    data: param
  });
}

