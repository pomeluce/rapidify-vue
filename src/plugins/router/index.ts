import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/routes';
import guard from '@/plugins/router/guard';
import { App } from 'vue';

// 创建路由实例, 并设置路由规则
const router = createRouter({
  // 指定路由模式: html5 模式
  history: createWebHistory(),
  routes,
});

// 全局路由导航, 验证登录状态
guard(router);

// 挂载路由对象
const setup = (app: App) => {
  app.use(router);
};
// 共享路由对象
export default router;
export { setup };
