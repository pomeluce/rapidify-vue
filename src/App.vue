<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
import Notify from '@/utils/notify/notify.tsx';
import Config from '@/config/config.ts';

// 主题配置
const { themeOverrides } = Config();
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
