<script setup lang="ts">
import RifyTextEditor from '@/components/rify/textEditor';

const textValue = ref<string>('');
</script>

<template>
  <main>
    <rify-text-editor v-model:modeValue="textValue" />
  </main>
</template>

<style scoped lang="scss"></style>
