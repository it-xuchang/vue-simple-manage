import instance from "@/plugin/axios";
//分页查询
export function page(param) {
  return instance({
    url: "/cms/category/page",
    method: "get",
    params: param
  });
}

export function editCategory(param) {
  return instance({
    url: "/cms/category/edit",
    method: "post",
    data: param
  });
}

export function deleteCategory(param) {
  return instance({
    url: "/cms/category/delete",
    method: "post",
    data: param
  });
}


