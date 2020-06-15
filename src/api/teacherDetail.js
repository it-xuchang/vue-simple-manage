import instance from "@/plugin/axios";
//查询
export function queryTeacher(param) {
  return instance({
    url: "/ums/teacher/query",
    method: "get",
    params: param
  });
}

