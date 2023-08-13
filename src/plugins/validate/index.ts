import rules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json';
import yup from './yup';

configure({
  // 配置中文
  generateMessage: localize('zh_CN', zh_CN),
  // blur 时验证
  validateOnInput: true,
  validateOnBlur: true,
});

// 定义全局验证规则
Object.keys(rules).forEach(rule => {
  defineRule(rule, rules[rule]);
});

// 一次性挂载所有验证规则
const useFields = (model: Record<string, any>) => {
  Object.keys(model).forEach(field => {
    const { value } = useField(field.toString());
    model[field] = value;
  });
};

const setup = () => {};

export { yup, useFields, setup };
