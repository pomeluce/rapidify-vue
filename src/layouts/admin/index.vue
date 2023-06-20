<script lang="ts" setup>
import Topbar from '@/layouts/admin/topbar.vue';
import LeftBar from '@/layouts/admin/leftbar.vue';
</script>

<template>
  <main class="grid w-screen h-screen lg:grid-cols-[auto_1fr]">
    <LeftBar />
    <section class="rify-admin-layout grid grid-rows-[auto_1fr] overflow-hidden">
      <Topbar />
      <div class="overflow-auto">
        <router-view #default="{ Component, route }">
          <component :is="Component" class="m-5" :key="route.fullPath" />
        </router-view>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped></style>
