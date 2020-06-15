//文件上传
import instance from '@/plugin/axios'

export function uploadImagesAndDocument(param) {
  return instance({
    url: "/fms/file/record/upload",
    method: "post",
    data: param,
    contentType: 'application/x-www-form-urlencoded'
  });
}

export function uploadMedia(param) {
  return instance({
    url: "/fms/file/record/upload/media",
    method: "post",
    data: param,
    contentType: 'application/x-www-form-urlencoded'
  });
}
