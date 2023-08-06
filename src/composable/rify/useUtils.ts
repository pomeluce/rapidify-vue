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

  /**
   * 颜色浅化函数
   * @param colorCode 颜色代码
   * @param amount 浅化程度, 默认为 20
   */
  const lightenColor = (colorCode: string, amount: number = 20) => {
    // 去除 # 号
    colorCode = colorCode.replace('#', '');

    // 将颜色代码解析为RGB值
    const red = parseInt(colorCode.substring(0, 2), 16);
    const green = parseInt(colorCode.substring(2, 4), 16);
    const blue = parseInt(colorCode.substring(4, 6), 16);

    // 计算浅化后的RGB值
    const newRed = Math.min(255, red + amount);
    const newGreen = Math.min(255, green + amount);
    const newBlue = Math.min(255, blue + amount);

    // 将浅化后的RGB值转换成十六进制格式
    const newColorCode = `#${newRed.toString(16).padStart(2, '0')}${newGreen.toString(16).padStart(2, '0')}${newBlue
      .toString(16)
      .padStart(2, '0')}`;

    return newColorCode;
  };

  /**
   * 颜色代码验证函数
   * @param colorCode 颜色代码
   * @return {boolean} 返回颜色代码是否合法
   */
  const isValidColorCode = (colorCode: string): boolean => {
    const colorCodeRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{8})$/;

    return colorCodeRegex.test(colorCode);
  };

  return { request, renderIcon, routeOpen, lightenColor, isValidColorCode };
};
