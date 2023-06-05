import { http } from '@/plugins/axios';
export default () => {
  /**
   * 获取当期用户信息
   */
  const currentUser = () => {
    return http.request<ResultModel<UserModel>>({ url: ApiUrl.CURRENT_USER });
  };
  return { currentUser };
};
