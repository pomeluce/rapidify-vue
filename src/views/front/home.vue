<script lang="ts" setup>
const show = () => {
  $notify.message.success('this is message', {
    closable: true,
    duration: 2000,
  });
  $notify.dialog.info({
    title: '我是标题',
    type: 'success',
  });
};

const load = () => {
  const loading = RifyLoading.service({
    message: '加载中...',
    bgColor: 'rgb(105, 107, 103,0.65)',
  });
  window.setTimeout(() => {
    loading.close();
  }, 2000);
};
</script>

<template>
  <rify-card class="h-[2000px]">
    <template #title>我是首页</template>
    <div class="flex gap-3">
      <n-button type="primary" secondary @click="show">消息测试</n-button>
      <n-button type="info" secondary @click="load">全局 load</n-button>
    </div>
  </rify-card>
</template>

<style lang="scss" scoped></style>
