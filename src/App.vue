<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
import Notify from '@/utils/notify/notify.tsx';
import Config from '@/config/config.ts';

defineOptions({ name: 'rify-app' });

// 主题配置
const { themeOverrides, browserTheme } = Config();

// 设置主题
onMounted(() => document.body.setAttribute('data-theme', browserTheme()));

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  document.body.setAttribute('data-theme', event.matches ? 'dark' : 'light');
});
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <notify />
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <suspense>
              <component :is="Component" />
            </suspense>
          </template>
        </router-view>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
