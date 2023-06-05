import { EditName, Logout, People } from '@icon-park/vue-next';
import {
  DropdownDividerOption,
  DropdownGroupOption,
  DropdownOption,
  DropdownRenderOption,
  GlobalThemeOverrides,
  NIcon,
} from 'naive-ui';

export interface IAxios {
  baseUrl: string;
  useTokenAuthorization: boolean;
  rifyHeader: string;
}

type IMenuOption = { label: string; key: string };
interface ITopbar {
  dropdown: Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>;
  menu: Array<IMenuOption>;
  breadcrumb: Array<any>;
}

export default () => {
  const axios: IAxios = {
    // 统一请求前缀
    baseUrl: '/api',
    // 开启 token 认证
    useTokenAuthorization: true,
    // 自定义请求头
    rifyHeader: 'rapidify-vue',
  };

  const topbar: ITopbar = {
    dropdown: [
      {
        label: '个人中心',
        key: RouteName.USER,
        icon: () => {
          return h(NIcon, null, { default: () => h(People) });
        },
      },
      {
        label: '修改资料',
        key: RouteName.DETAIL,
        icon: () => {
          return h(NIcon, null, { default: () => h(EditName) });
        },
      },
      {
        label: '退出登录',
        key: RouteName.LOGOUT,
        icon: () => {
          return h(NIcon, null, { default: () => h(Logout) });
        },
      },
    ],
    menu: [
      {
        label: '首页',
        key: RouteName.HOME,
      },
      {
        label: '登录页',
        key: RouteName.LOGIN,
      },
      {
        label: '注册页',
        key: RouteName.REGISTER,
      },
      {
        label: '系统后台',
        key: RouteName.ADMIN,
      },
    ],
    breadcrumb: [
      {
        label: '首页',
        to: RouteName.HOME,
      },
      {
        label: '主控台',
        to: RouteName.ADMIN,
      },
    ],
  };

  const themeOverrides: GlobalThemeOverrides = {};

  return { axios, topbar, themeOverrides };
};
