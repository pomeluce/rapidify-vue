<script setup lang="ts">
import router from '@/plugins/router';
import { RouteRecordRaw } from 'vue-router';

const menuStore = useMenuStore();

const { routeOpen } = useUtils();
const routes = router
  .getRoutes()
  .filter(route => route.children.length)
  .filter(route => route.meta.menu)
  .sort((r1, r2) => (r1.meta.menu?.order ?? 0) - (r2.meta.menu?.order ?? 0));
const goto = (route: RouteRecordRaw) => {
  route.meta?.menu?.blank ? routeOpen(route, '_blank') : router.push(route);
};

onMounted(() => {
  // 移动端, 点击关闭菜单
  document.documentElement.addEventListener('click', () => {
    if (document.documentElement.clientWidth < 768) menuStore.menuState = false;
  });
});
</script>

<template>
  <div class="bg-slate-700 absolute md:relative h-full overflow-auto z-30">
    <main class="flex py-7 md:hidden"></main>
    <main v-if="menuStore.menuState">
      <nav class="text-slate-300">
        <router-link
          :to="{ name: RouteName.ADMIN }"
          class="flex justify-center items-center px-7 py-4 gap-1 cursor-pointer"
        >
          <icon-application-one theme="outline" size="24" />
          <span class="text-lg uppercase">rapidify-vue</span>
        </router-link>
        <div>
          <section v-for="(route, index) in routes" :key="index" class="flex flex-col p-5 text-sm font-medium">
            <article class="flex items-center gap-2">
              <component :is="route.meta.menu?.icon" size="16" />
              <span>{{ route.meta.menu?.label }}</span>
            </article>
            <article>
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
    @apply text-slate-50;
  }
}

.menu-option {
  @apply px-5 py-3 my-2 rounded text-white bg-slate-600 hover:bg-slate-500 opacity-80 cursor-pointer;

  &.active {
    @apply bg-rify-primary opacity-95;
  }
}
</style>
