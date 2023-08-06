import { RouteRecordRaw } from 'vue-router';
import { Error } from '@icon-park/vue-next';

export default {
  path: '/admin',
  component: () => import('@/layouts/error/index.vue'),
  meta: { auth: false, menu: { label: '异常页面', icon: Error, order: 4 } },
  children: [
    {
      path: '403',
      name: 'error.403',
      meta: { menu: { label: '403页面', blank: '_blank' } },
      component: () => import('@/views/errors/403.vue'),
    },
    {
      path: '404',
      name: 'error.404',
      meta: { menu: { label: '404页面', blank: '_blank' } },
      component: () => import('@/views/errors/404.vue'),
    },
    {
      path: '500',
      name: 'error.500',
      meta: { menu: { label: '500页面', blank: '_blank' } },
      component: () => import('@/views/errors/500.vue'),
    },
  ],
} as RouteRecordRaw;
