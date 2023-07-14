<script setup lang="ts">
import { DefineComponent } from 'vue';

defineOptions({ name: 'Statistic' });

/* props 定义 */
const { label, value, type, footer, tag } = defineProps<{
  label?: string;
  icon: {
    component: DefineComponent;
    attribute: Record<string, any>;
  };
  value?: number;
  type?: 'up' | 'down';
  footer?: string;
  tag?: string;
}>();
</script>

<template>
  <rify-card is-hover-shadow>
    <section class="flex flex-col gap-5">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">{{ label }}</span>
        <component :is="icon.component" v-bind="icon.attribute" />
      </div>
      <span class="flex justify-center">
        <n-statistic tabular-nums>
          <template #prefix>
            <icon-arrow-up v-if="type === 'up'" class="text-green-700 opacity-80" />
            <icon-arrow-down v-else class="text-red-700 opacity-80" />
          </template>
          <span class="inline-flex items-center text-xl sm:text-2xl">
            <n-number-animation show-separator :from="0" :to="value" />
          </span>
        </n-statistic>
      </span>
      <div class="flex justify-center items-center gap-5">
        <span class="text-sm text-slate-800">{{ footer }}</span>
        <n-tag v-if="type === 'up'" size="small" type="success"> + {{ tag }} </n-tag>
        <n-tag v-else size="small" type="error"> - {{ tag }} </n-tag>
      </div>
    </section>
  </rify-card>
</template>

<style scoped lang="scss"></style>
