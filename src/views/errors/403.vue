<script setup lang="ts"></script>

<template>
  <rify-error :httpCode="HttpStatus.FORBIDDEN" message="抱歉, 你无权访问该页面" bgColor="#ffbb96">
    <template #opreate>
      <n-button class="shadow-md" type="primary" size="large" color="#ff7a45" round @click="$router.push('/')"
        >返回首页</n-button
      >
    </template>
  </rify-error>
</template>

<style scoped lang="scss"></style>
