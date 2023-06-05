import _ from 'lodash';

export const parseEnv = (env: Record<string, any>): ImportMetaEnv => {
  const envs: any = _.cloneDeep(env);
  /* env 参数转换 */
  Object.entries(env).forEach(([key, value]) => {
    // 转换 boolean 值
    if (value == 'true' || value == 'false') envs[key] = value === 'true';
    // 转换 number 值
    else if (/^\d+$/.test(value)) envs[key] = Number(value);
    // 转换 null 值
    else if (value == 'null' || value == '') envs[key] = null;
    // 转换 undefined 值
    else if (value == 'undefined') envs[key] = undefined;
  });
  return envs;
};
