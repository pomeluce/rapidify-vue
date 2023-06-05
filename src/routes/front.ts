import { RouteRecordRaw } from 'vue-router';
export default {
  path: '/',
  component: () => import('@/layouts/front/index.vue'),
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('@/views/front/home.vue'),
    },
  ],
} as RouteRecordRaw;
