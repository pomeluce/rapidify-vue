<script setup lang="ts">
const { info, type } = defineProps<{
  info: string | undefined;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}>();
</script>

<template>
  <div v-if="!!info" :class="`flex items-center gap-3 mx-3 px-3 py-2 text-sm border rounded-md ${type || 'danger'}`">
    <icon-attention />
    {{ info }}
  </div>
</template>

<style scoped lang="scss">
.primary {
  @apply text-blue-400 bg-blue-50 border-blue-100;
}

.success {
  @apply text-green-600 bg-green-50 border-green-500 border-opacity-25;
}

.warning {
  @apply text-orange-400 bg-orange-50 border-orange-100;
}

.danger {
  @apply text-red-400 bg-red-50 border-red-100;
}

.info {
  @apply text-slate-500 bg-slate-100 border-slate-200;
}
</style>
