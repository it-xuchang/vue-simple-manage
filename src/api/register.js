// 导入axios实例
import instance from "@/plugin/axios";

//注册
export function register(data) {
  return instance({
    url: "/ams/user/access/register",
    method: "post",
    data: data
  });
}
