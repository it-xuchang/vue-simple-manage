// 导入axios实例
import instance from "@/plugin/axios";

//获取验证码
export function getCode(data) {
  return instance({
    url: "/ams/user/access/get/code",
    method: "post",
    data: data
  });
}
//忘记密码
export function forgetPassword(data) {
  return instance({
    url: "/ams/user/access/forget/password",
    method: "post",
    data: data
  });
}
