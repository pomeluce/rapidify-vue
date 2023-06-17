<script setup lang="ts">
const textValue = ref<string>('');
const images = ref<string[]>([]);
</script>

<template>
  <main>
    <rify-card>
      <template #title>富文本编辑器</template>
      <rify-text-editor v-model:modeValue="textValue" v-model:urlArray="images" />
    </rify-card>
  </main>
</template>

<style scoped lang="scss"></style>
