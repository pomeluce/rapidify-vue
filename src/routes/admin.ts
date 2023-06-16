import { Config, DashboardOne, WaterfallsH } from '@icon-park/vue-next';
import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/admin',
    component: () => import('@/layouts/admin/index.vue'),
    meta: { auth: false, menu: { label: 'Dashboard', icon: DashboardOne, order: 1 } },
    children: [
      {
        path: '',
        name: 'admin',
        meta: { menu: { label: '主控台' } },
        component: () => import('@/views/admin/index.vue'),
      },
      {
        path: 'workbench',
        name: 'workbench',
        meta: { menu: { label: '工作台' } },
        component: () => import('@/views/admin/index.vue'),
      },
    ],
  },
  {
    path: '/admin/system',
    component: () => import('@/layouts/admin/index.vue'),
    meta: { auth: false, menu: { label: '系统管理', icon: Config, order: 2 } },
    children: [
      {
        path: 'user',
        name: 'userModel',
        meta: { menu: { label: '用户管理' } },
        component: () => import('@/views/admin/index.vue'),
      },
      {
        path: 'role',
        name: 'roleModel',
        meta: { menu: { label: '角色管理' } },
        component: () => import('@/views/admin/index.vue'),
      },
      {
        path: 'permissions',
        name: 'permissions',
        meta: { menu: { label: '权限管理' } },
        component: () => import('@/views/admin/index.vue'),
      },
    ],
  },
  {
    path: '/admin/component',
    component: () => import('@/layouts/admin/index.vue'),
    meta: { auth: false, menu: { label: '组件列表', icon: WaterfallsH, order: 2 } },
    children: [
      {
        path: 'editor',
        name: 'textEditor',
        meta: { menu: { label: '富文本编辑器' } },
        component: () => import('@/views/admin/editor.vue'),
      },
      {
        path: 'markdown',
        name: 'markdown',
        meta: { menu: { label: 'Markdown' } },
        component: () => import('@/views/admin/markdown.vue'),
      },
      {
        path: 'table',
        name: 'visualTable',
        meta: { menu: { label: 'VisualTable' } },
        component: () => import('@/views/admin/table.vue'),
      },
    ],
  },
] as RouteRecordRaw[];
