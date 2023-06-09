<script lang="ts" setup>
import Logo from '@/assets/pomeluce.svg';

const { topbar } = config();
</script>

<template>
  <main class="flex items-center h-[65px] bg-white shadow-sm border-b border-gray-300 sticky top-0 z-50">
    <div class="flex justify-between items-center px-3 w-full 2xl:w-page 2xl:m-auto">
      <section class="flex items-center xl:items-stretch md:mr-6 text-gray-600">
        <div class="flex justify-center items-center">
          <router-link to="/" class="flex justify-between items-center gap-1 font-bold mr-5 text-rify-primary">
            <n-image preview-disabled :src="Logo" class="w-6 h-6" />
            <span class="font-bold text-xl uppercase">rapidify-vue</span>
          </router-link>
        </div>
        <main class="xl:flex justify-center items-center gap-3 font-bold opacity-95 hidden">
          <router-link
            class="flex items-center gap-1"
            v-for="(item, key) in topbar.menu"
            :key="key"
            :to="{ name: item.key }"
            active-class="flex items-center gap-1 text-rify-menu"
          >
            {{ item.label }}
          </router-link>
        </main>
      </section>
      <section class="flex items-center gap-2">
        <rify-screen />
        <rify-avatar-menu />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
a {
  @apply hover:text-rify-menu;
}
</style>
