import { RouteLocationNormalized, Router } from 'vue-router';

// 初始化变量
let isInit = false;

//初始应用
const init = async () => {
  if (isInit) return;
  isInit = true;
  const { getCurrentUser } = useUserStore();
  try {
    await Promise.all([getCurrentUser()]);
  } catch (e) {
    console.error('Interface Anonymous Access');
  }
};

const beforeEach = async (to: RouteLocationNormalized) => {
  // 初始化应用
  await init();
  const storage = useStorage();
  const { isLogin } = useAuth();

  // 访问需要登录的资源进行登录验证
  if (to.meta.auth && !isLogin()) {
    storage.set(CacheKey.REDIRECT_ROUTE_NAME, to.fullPath);
    RifyMessage({ type: 'info', content: '您当前还未登录, 请先登录' });
    return { name: RouteName.LOGIN };
  }

  // 如果是登录页面, 判断是否登录, 如果已经登录则跳转到首页
  if (to.meta.guest && isLogin()) return '/';
  // 如果是登出, 则重置 notify
  if (to.path.endsWith(RouteName.LOGIN)) isInit = false;
};

export default (router: Router) => {
  // 全局路由导航, 验证登录状态
  router.beforeEach(beforeEach);
};
