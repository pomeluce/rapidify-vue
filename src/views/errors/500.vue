<script setup lang="ts"></script>

<template>
  <rify-error :httpCode="500" message="抱歉, 服务器出错了" bgColor="#ffa39e">
    <template #button>
      <n-button class="shadow-md" type="primary" size="large" color="#ff4d4f" round @click="$router.push('/')"
        >返回首页</n-button
      >
    </template>
  </rify-error>
</template>

<style scoped lang="scss"></style>
