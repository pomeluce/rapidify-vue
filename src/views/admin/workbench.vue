<script setup lang="ts">
import { RifyDragVerifyOptions } from '@/rify';

const { captcha } = useAuth();

const options = ref<RifyDragVerifyOptions>();

const getCaptcha = async () => {
  const { data: reuslt } = await captcha<RifyDragVerifyOptions>(300, 200, 32);
  options.value = reuslt;
};

onBeforeMount(() => {
  getCaptcha();
});
</script>

<template>
  <main>
    <rify-drag-verify :width="300" :height="200" :options="options" @handleRest="getCaptcha" />
  </main>
</template>

<style scoped lang="scss"></style>
