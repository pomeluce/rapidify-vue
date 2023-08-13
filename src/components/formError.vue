<script setup lang="ts">
const { info } = defineProps<{
  info: string | undefined;
}>();
</script>

<template>
  <div v-if="!!info" class="mx-3 px-3 py-2 text-sm text-orange-500 bg-orange-100 rounded-md">
    <icon-attention />
    {{ info }}
  </div>
</template>

<style scoped lang="scss"></style>
