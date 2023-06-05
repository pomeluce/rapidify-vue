import { http } from '@/plugins/axios';
export default () => {
  /**
   * 获取当期用户信息
   */
  const uploadImage = (data: FormData) => {
    return http.request<ResultModel<string>>({
      method: 'POST',
      url: ApiUrl.UPLOAD_IMAGE,
      data,
    });
  };
  return { uploadImage };
};
