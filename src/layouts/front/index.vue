<script lang="ts" setup>
import Topbar from '@/layouts/front/topbar.vue';
</script>

<template>
  <main>
    <Topbar />
    <router-view v-slot="{ Component, route }">
      <template v-if="Component">
        <component :is="Component" :key="route.fullPath" class="w-full 2xl:w-page mx-auto p-3 mt-5" />
      </template>
    </router-view>
  </main>
</template>

<style lang="scss" scoped></style>
