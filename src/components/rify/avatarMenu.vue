<script lang="ts" setup>
import config from '@/config/config.ts';
import { DropdownOption } from 'naive-ui';

defineOptions({ name: 'rify-avatar-menu' });

const { user } = useUserStore();
const { topbar } = config();

const handleSelect = (key: string | number, option: DropdownOption) => {};
</script>

<template>
  <main class="flex justify-center">
    <section v-if="!!user" class="cursor-pointer">
      <n-dropdown
        class="flex flex-col items-stretch rounded-xl shadow-md border"
        trigger="click"
        :options="topbar.dropdown"
        content-style="color: blue"
        @select="handleSelect"
      >
        <span class="flex items-center gap-3">
          <n-avatar class="w-7 h-7" object-fit="cover" circle :src="'/src/assets' + user.avatar"></n-avatar>
          <span class="flex justify-start font-bold text-gray-700"> {{ user.name }} </span>
        </span>
      </n-dropdown>
    </section>
    <section v-else class="flex justify-center gap-2">
      <router-link class="hover:bg-blue-500" :to="{ name: RouteName.LOGIN }">登录</router-link>
      <router-link class="hover:bg-slate-600" :to="{ name: RouteName.REGISTER }">注册</router-link>
    </section>
  </main>
</template>

<style lang="scss" scoped>
a {
  @apply outline outline-1 outline-gray-200 px-4 py-1 rounded bg-slate-100 hover:text-white duration-300 text-sm flex items-center;
}
</style>
