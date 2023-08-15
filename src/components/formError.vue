<script setup lang="ts">
const { info } = defineProps<{
  info: string | undefined;
}>();
</script>

<template>
  <div v-if="!!info" :class="'mx-3'">
    <rify-alert :title="info" type="error" showIcon />
  </div>
</template>

<style scoped lang="scss"></style>
