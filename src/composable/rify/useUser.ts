import { http } from '@/plugins/axios';
export default () => {
  /**
   * 获取当期用户信息
   */
  const currentUser = () => {
    return http.request<ResultModel<UserModel>>({ url: ApiUrl.CURRENT_USER });
  };

  /**
   *  获取用户信息列表
   */
  const queryUserList = (number: number) => {
    return http.request<ResultModel<UserModel[]>>({ url: ApiUrl.QUERY_USER_LIST + '/' + number });
  };
  return { currentUser, queryUserList };
};
