import { ComponentPublicInstance } from 'vue';
import { ILoadOptions } from '@/directives/loading';

class RifyLoad {
  private instance: ILoadOptions;
  private component: ComponentPublicInstance;

  /**
   * 构造函数
   * @param options 组件参数
   * @param component 组件实例
   */
  constructor(options: ILoadOptions, component: ComponentPublicInstance) {
    this.instance = options;
    this.component = component;
  }

  /**
   * 组件显示方法
   */
  public show() {
    // 设置组件显示
    this.instance.isShow = false;
    // 将组件挂载到根目录元素上
    document.body.appendChild(this.component.$el);
  }

  /**
   * 组件隐藏方法
   */
  public close() {
    // 设置组件隐藏
    this.instance.isShow = true;
  }

  /**
   * 组件销毁方法
   */
  public remove() {
    document.querySelector('.rify-loading')?.remove();
  }
}
export { RifyLoad };
