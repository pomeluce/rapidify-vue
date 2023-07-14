import { Component } from 'vue';
import { NIcon } from 'naive-ui';
import { RouteRecordRaw } from 'vue-router';
import router from '@/plugins/router';

export default () => {
  /**
   * request 方法, 用于防止重复请求, 限制点击频率
   * @param fn 需要执行的函数
   * @return {(args?: any) => (undefined | Promise<any>)} 返回一个函数, 该函数接收一个参数, 并返回一个 Promise
   */
  const request = (fn: (args?: any) => Promise<any>): ((args?: any) => undefined | Promise<any>) => {
    let sendStatus = false;
    return (args?: any) => {
      if (sendStatus) return;
      sendStatus = true;
      return fn(args).finally(() => {
        sendStatus = false;
      });
    };
  };

  /**
   * 图标挂载函数
   * @param Icon 图标组件
   */
  const renderIcon = (Icon: Component) => {
    return () => {
      return h(NIcon, null, { default: () => h(Icon) });
    };
  };

  /**
   * 路由跳转函数
   * @param route 路由对象或者路由路径
   * @param target 跳转方式, 默认为 _self
   */
  const routeOpen = (route: RouteRecordRaw | string, target: string = '_self') => {
    if (typeof route !== 'string') route = router.resolve(route).fullPath;
    if (target === '_blank') window.open(route);
    else location.href = route;
  };

  return { request, renderIcon, routeOpen };
};
