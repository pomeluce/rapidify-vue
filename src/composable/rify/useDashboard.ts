import { http } from '@/plugins/axios';

export default () => {
  /**
   * 获取 Dashboard 面板数据
   */
  const qeuryAssessInfo = () => {
    return http.request<ResultModel<Array<Array<any>>>>({ url: ApiUrl.DASHBOARD_LIST });
  };
  return { qeuryAssessInfo };
};
