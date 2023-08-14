<script setup lang="ts">
import cricle from '@/assets/images/cricle.svg';
import triangle from '@/assets/images/triangle.svg';

const { src } = defineProps<{ src: string | undefined }>();
</script>

<template>
  <div class="relative w-40 h-40 bg-[#f0f0f0] flex justify-center items-center rounded-full">
    <span class="illustration-symbol">
      <img :src="cricle" alt="" />
    </span>
    <span class="illustration-symbol">
      <img :src="triangle" alt="" />
    </span>
    <span class="illustration-symbol">
      <img :src="triangle" alt="" />
    </span>
    <span class="illustration-symbol">
      <img :src="cricle" alt="" />
    </span>
    <img class="w-2/3" :src="src" alt="" />
  </div>
</template>

<style scoped lang="scss">
.illustration-symbol {
  @apply absolute;

  &:first-child {
    @apply top-0 left-0 w-4 h-4;
  }

  &:nth-child(2) {
    @apply -left-3 bottom-3 w-4 h-4;
  }

  &:nth-child(3) {
    @apply -right-3 top-3 w-3 h-3 transform rotate-6;
  }

  &:nth-child(4) {
    @apply right-0 bottom-0 w-3 h-3;
  }
}
</style>
