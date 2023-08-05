<script setup lang="ts">
import router from '@/plugins/router';
import { RouteRecordRaw } from 'vue-router';
import Logo from '@/assets/pomeluce.svg';
import { forEach } from 'lodash';

const menuStore = useMenuStore();

const { routeOpen } = useUtils();
const routes = router
  .getRoutes()
  .filter(route => route.children.length)
  .filter(route => route.meta.menu)
  .sort((r1, r2) => (r1.meta.menu?.order ?? 0) - (r2.meta.menu?.order ?? 0));
const goto = (route: RouteRecordRaw) => {
  route.meta?.menu?.blank ? routeOpen(route, '_blank') : router.push(route);
  document.documentElement.clientWidth < 1024 && (menuStore.menuState = false);
};

/**
 * 菜单显示隐藏
 * @param index 菜单索引
 */
const toggleMenuList = (index: number) => {
  document.getElementsByClassName('rify-menu-item__list')[index].classList.toggle('hidden');
  const el = document.getElementsByClassName('rify-menu-item__suffix')[index].children;
  forEach(el, item => {
    item.classList.contains('hidden') ? item.classList.remove('hidden') : item.classList.add('hidden');
  });
};

onMounted(() => {
  // 移动端, 点击关闭菜单
  document.querySelector('.rify-admin-layout')?.addEventListener('click', () => {
    document.documentElement.clientWidth < 1024 && (menuStore.menuState = false);
  });
  // 当前路由菜单展开
  (document.querySelector('.menu-option.active')!.parentElement?.previousElementSibling as HTMLElement).click();

  // 加载时为移动端, 则关闭菜单
  document.documentElement.clientWidth < 1024 && (menuStore.menuState = false);
});

// 监听窗口变化, 调整菜单状态
window.addEventListener('resize', () => {
  document.documentElement.clientWidth < 1024 && (menuStore.menuState = false);
});
</script>

<template>
  <div class="bg-gray-50 border-r shadow-lg lg:shadow-none absolute lg:relative h-full overflow-auto z-50">
    <main v-show="menuStore.menuState">
      <nav class="text-slate-800">
        <router-link
          :to="{ name: RouteName.ADMIN }"
          class="flex justify-center items-start px-7 py-4 gap-1 cursor-pointer"
        >
          <n-image preview-disabled :src="Logo" class="w-6 h-6" />
          <span class="text-lg font-bold uppercase">rapidify-vue</span>
        </router-link>
        <div>
          <section
            v-for="(route, index) in routes"
            :key="index"
            class="flex flex-col mx-7 py-5 text-sm font-medium border-b"
          >
            <article class="flex justify-between items-center cursor-pointer" @click="toggleMenuList(index)">
              <span class="flex items-center gap-2">
                <component :is="route.meta.menu?.icon!" size="16" />
                <span class="select-none">{{ route.meta.menu?.label }}</span>
              </span>
              <span class="rify-menu-item__suffix">
                <icon-down class="hidden" size="16" />
                <icon-right size="16" />
              </span>
            </article>
            <article class="rify-menu-item__list hidden">
              <div
                v-for="(item, key) in route.children"
                :key="key"
                :class="{ 'menu-option': true, active: $route.name === item.name }"
                @click="goto(item)"
              >
                {{ item.meta?.menu?.label }}
              </div>
            </article>
          </section>
        </div>
      </nav>
    </main>
  </div>
</template>

<style scoped lang="scss">
a {
  &:hover {
    @apply text-slate-900;
  }
}

.menu-option {
  @apply px-5 py-3 my-3 rounded text-[#0066ff] bg-[#dbebfd] opacity-80 cursor-pointer;

  &:hover,
  &.active {
    @apply bg-rify-primary opacity-95 text-white;
  }
}
</style>
