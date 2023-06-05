import { RouteRecordRaw } from 'vue-router';
import { Error } from '@icon-park/vue-next';
export default {
  path: '/admin',
  component: () => import('@/layouts/admin/index.vue'),
  meta: { auth: false, menu: { label: '异常页面', icon: Error, order: 3 } },
  children: [
    {
      path: '404',
      name: 'error.404',
      meta: { menu: { label: '404页面', blank: '_blank' } },
      component: () => import('@/views/admin/index.vue'),
    },
    {
      path: '500',
      name: 'error.500',
      meta: { menu: { label: '500页面', blank: '_blank' } },
      component: () => import('@/views/admin/index.vue'),
    },
  ],
} as RouteRecordRaw;
