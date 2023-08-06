<script setup lang="ts"></script>

<template>
  <rify-error :httpCode="404" message="抱歉, 你访问的页面不存在" bgColor="#adc6ff">
    <template #opreate>
      <n-button class="shadow-md" type="primary" size="large" color="#597ef7" round @click="$router.push('/')"
        >返回首页</n-button
      >
    </template>
  </rify-error>
</template>

<style scoped lang="scss"></style>
