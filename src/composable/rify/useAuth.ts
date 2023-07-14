import { http } from '@/plugins/axios';
import router from '@/plugins/router';
const { request } = useUtils();
const storage = useStorage();
export default () => {
  /**
   * 判断用户是否登录
   * @return {boolean} 返回一个 Boolean 类型的判断结果
   */
  const isLogin = (): Boolean => {
    return !!storage.get(CacheKey.TOKEN_NAME);
  };

  /**
   * 登录接口
   * @type {(args?: any) => (undefined | Promise<any>)} 传入一个登录请求函数
   */
  const login: (args?: any) => undefined | Promise<any> = request(async (data: UserModel) => {
    const { data: token } = await http.request<ResultModel<string>>({
      url: ApiUrl.LOGIN,
      method: 'POST',
      data,
    });
    storage.set(CacheKey.TOKEN_NAME, token);
    await router.push({ name: CacheKey.REDIRECT_ROUTE_NAME });
  });

  return { isLogin, login };
};
