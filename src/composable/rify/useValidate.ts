import v, { componentValid } from '@/plugins/validate';

export default () => {
  /**
   * 登录表单验证
   *
   * @param initialValues - 待验证的登录表单对象
   * @returns 返回表单验证结果
   */
  const loginValid = (initialValues: Ref<Record<string, any>>) => {
    return componentValid(initialValues, {
      account: v.string().required().email().label('邮箱'),
      password: v.string().required().min(8).label('密码'),
    });
  };

  /**
   * 注册表单验证
   *
   * @param initialValues - 待验证的注册表单对象
   * @returns 返回表单验证结果
   */
  const registerValid = (initialValues: Ref<Record<string, any>>) => {
    return componentValid(initialValues, {
      account: v.string().required().email().label('邮箱'),
      password: v.string().required().min(8).label('密码'),
      confirmed: v
        .string()
        .required()
        .oneOf([v.ref('password')], '两次密码不一致')
        .label('确认密码'),
    });
  };

  return { loginValid, registerValid };
};
