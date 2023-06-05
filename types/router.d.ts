import 'vue-router';
import { DefineComponent } from 'vue';

export type RouteMenu = {
  label?: string;
  icon?: DefineComponent;
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
