import rifyLoading from '@/components/rify/loading';
import { App } from 'vue';

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
const $rifyLoading = createApp(rifyLoading, { options }).mount(vNode);
// 组件加载方法
const RifyLoading = {
  service(option?: ILoadOptions) {
    // 传递参数
    Object.assign(options, option);
    // 显示组件
    this.show();
    // 返回组件
    return this;
  },
  show() {
    // 设置组件显示
    options.isShow = false;
    // 将组件挂载到根目录元素上
    document.body.appendChild($rifyLoading.$el);
  },
  close() {
    // 设置组件隐藏
    options.isShow = true;
  },
};

export default {
  install(app: App) {
    app.config.globalProperties.$rifyLoading = RifyLoading;
  },
};
export { RifyLoading };
