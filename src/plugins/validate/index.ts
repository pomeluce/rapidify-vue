import * as yup from 'yup';
import { setLocale } from 'yup';
import { configure, useForm, ComponentModellessBinds, GenericObject } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import { toTypedSchema } from '@vee-validate/yup';
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json';

type FieldType = Ref<ComponentModellessBinds & { 'onUpdate:modelValue': (value: string | undefined) => void } & { modelValue: string | undefined } & GenericObject>;

configure({
  // 配置中文
  generateMessage: localize('zh_CN', zh_CN),
  // blur 时验证
  validateOnInput: true,
  validateOnBlur: true,
});

setLocale({
  mixed: {
    required: '${label}不能为空',
  },
  string: {
    email: '邮箱格式错误',
    min: '${label}不能少于 ${min} 个字符',
    max: '${label}不能多于 ${max} 个字符',
  },
  number: {
    min: '${label}不能小于 ${min}',
    max: '${label}不能大于 ${max}',
  },
  date: {
    min: '${label}不能早于 ${min}',
    max: '${label}不能晚于 ${max}',
  },
});

const componentValid = (initialValues: Ref<Record<string, any>>, yupSchema: yup.ObjectShape) => {
  const { values, errors, defineComponentBinds } = useForm({
    initialValues,
    validationSchema: toTypedSchema(yup.object(yupSchema)),
  });

  const fields: Record<string, FieldType> = {};

  Object.keys(initialValues.value).forEach(key => (fields[key] = defineComponentBinds(key)));

  initialValues.value = values;

  return { errors, fields };
};

const setup = () => {};

export { setup, componentValid };
export default yup;
