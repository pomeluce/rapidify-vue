import { RouteRecordRaw } from 'vue-router';
import { Success } from '@icon-park/vue-next';
export default [
  {
    path: '/admin/result',
    component: () => import('@/layouts/admin/index.vue'),
    meta: { auth: false, menu: { label: '结果页面', icon: Success, order: 3 } },
    children: [
      {
        path: 'success',
        name: 'reuslt.success',
        meta: { menu: { label: '成功页' } },
        component: () => import('@/views/result/success.vue'),
      },
      {
        path: 'failed',
        name: 'result.failed',
        meta: { menu: { label: '失败页' } },
        component: () => import('@/views/result/failed.vue'),
      },
      {
        path: 'info',
        name: 'result.info',
        meta: { menu: { label: '信息页' } },
        component: () => import('@/views/result/info.vue'),
      },
    ],
  },
] as RouteRecordRaw[];
