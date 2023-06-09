import 'vue-router';
import { DefineComponent } from 'vue';
import { IIconProps } from '@icon-park/vue-next/lib/runtime';

export type RouteMenu = {
  label?: string;
  icon?: DefineComponent<IIconProps>;
  blank?: string;
  order?: number;
};

declare module 'vue-router' {
  interface RouteMeta {
    auth?: boolean;
    label?: string;
    menu?: RouteMenu;
    prefix?: boolean;
  }
}
