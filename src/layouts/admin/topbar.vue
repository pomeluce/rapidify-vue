<script setup lang="ts">
const menuStore = useMenuStore();
const { topbar } = config();
</script>

<template>
  <main
    class="flex justify-between items-center py-3 px-5 bg-slate-50 relative shadow-sm border-b border-gray-300 z-40"
  >
    <section class="flex items-center gap-2">
      <span class="flex items-center cursor-pointer text-rify-primary" @click.stop="menuStore.toggleMenu()">
        <icon-hamburger-button theme="outline" size="22" :strokeWidth="5" />
      </span>
      <rify-breadcrumb :options="topbar.breadcrumb" />
    </section>
    <section class="flex items-center gap-2">
      <rify-screen />
      <avatar-menu />
    </section>
  </main>
</template>

<style scoped lang="scss"></style>
