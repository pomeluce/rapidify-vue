<script setup lang="ts">
import success from '@/assets/images/success.svg';

const message = ref<String>('提交结果页面用来反馈一系列操作及任务的处理结果, 灰色区域可用来进行一些信息补充');
</script>

<template>
  <rify-card>
    <rify-result title="操作成功" :message="message">
      <template #icon> <img class="w-24" :src="success" /> </template>
      <span class="block text-center"> 已提交加班申请, 等待直属主管审核 </span>
      <template #opreate>
        <section class="flex justify-center gap-3">
          <n-button type="success" size="large" @click="$router.push('/')">返回首页</n-button>
          <n-button size="large">查看详情</n-button>
        </section>
      </template>
    </rify-result>
  </rify-card>
</template>

<style scoped lang="scss"></style>
