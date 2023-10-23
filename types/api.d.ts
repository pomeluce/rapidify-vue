/* 请求结果模型 */
interface ResultModel<T> {
  code: number;
  message: string;
  data: T;
  body: any;
}

/* 登录表单模型 */
interface LoginBody {
  uid: string;
  account: string;
  password: string;
  code: string;
}
