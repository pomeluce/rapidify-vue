import { Bydesign, Config, DashboardOne, WaterfallsH } from '@icon-park/vue-next';
import { RouteRecordRaw } from 'vue-router';
import result from './result';

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
        component: () => import('@/views/admin/workbench.vue'),
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
        component: () => import('@/views/admin/workbench.vue'),
      },
      {
        path: 'role',
        name: 'roleModel',
        meta: { menu: { label: '角色管理' } },
        component: () => import('@/views/admin/workbench.vue'),
      },
      {
        path: 'permissions',
        name: 'permissions',
        meta: { menu: { label: '权限管理' } },
        component: () => import('@/views/admin/workbench.vue'),
      },
    ],
  },
  {
    path: '/admin/process',
    component: () => import('@/layouts/admin/index.vue'),
    meta: { auth: false, menu: { label: '流程管理', icon: Bydesign, order: 2 } },
    children: [
      {
        path: 'define',
        name: 'processDefine',
        meta: { menu: { label: '流程定义' } },
        component: () => import('@/views/admin/workbench.vue'),
      },
      {
        path: 'design',
        name: 'processDesign',
        meta: { menu: { label: '流程设计' } },
        component: () => import('@/views/admin/workbench.vue'),
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
      {
        path: 'workflow',
        name: 'workflow',
        meta: { menu: { label: 'WorkFlow' } },
        component: () => import('@/views/admin/workflow.vue'),
      },
      {
        path: 'excel',
        name: 'excelSheet',
        meta: { menu: { label: 'ExcelSheet' } },
        component: () => import('@/views/admin/excel.vue'),
      },
    ],
  },
  ...result,
] as RouteRecordRaw[];
