import { App, DirectiveBinding } from 'vue';
import RifyLoadComponent from '@/rify/load';
import { RifyLoad } from '@/directives/loading/RifyLoad';

/* loading 参数模型 */
export interface ILoadOptions {
  isShow?: boolean;
  color?: string;
  size?: number;
  width?: number;
  message?: string | undefined;
  bgColor?: string;
}

// 创建根目录元素
const vNode: HTMLElement = document.createElement('div');
// 设置 class 属性
vNode.setAttribute('class', 'rify-loading');
// 定义组件参数
let options: ILoadOptions = reactive({
  isShow: true,
  color: '#005dd3',
  size: 56,
  width: 2,
  message: undefined,
  bgColor: '',
});

// 组件传递参数并挂载在根目录元素上
const $loading = createApp(RifyLoadComponent, { options }).mount(vNode);
// 组件加载方法
const RifyLoading = (option?: ILoadOptions): RifyLoad => {
  // 传递参数
  Object.assign(options, option);
  // 创建实例对象
  const loading = new RifyLoad(options, $loading);
  // 显示组件
  loading.show();
  // 返回实例
  return loading;
};

export default (app: App) => {
  const loadInstance = ref<RifyLoad>();
  app.directive('rifyLoad', {
    mounted(_: HTMLElement, binding: DirectiveBinding<boolean>) {
      binding.value && (loadInstance.value = RifyLoading()).show();
    },
    updated(_: HTMLElement, binding: DirectiveBinding<boolean>) {
      binding.value ? (loadInstance.value = RifyLoading()).show() : loadInstance.value?.close();
    },
  });
};

export { RifyLoading };
