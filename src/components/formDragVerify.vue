<script setup lang="ts">
import { RifyDragVerifyOptions } from '@/rify';

const { captcha } = useAuth();

const isShow = ref<boolean>(false);

const { width, height, length } = withDefaults(
  defineProps<{
    width: number;
    height: number;
    length: number;
  }>(),
  {
    width: 300,
    height: 200,
    length: 32,
  },
);

const options = ref<RifyDragVerifyOptions>();
const verify = ref<boolean>(false);
const isEnd = ref<boolean>(false);

const getCaptcha = async () => {
  const { data: reuslt } = await captcha<RifyDragVerifyOptions>(width, height, length);
  options.value = reuslt;
};

/**
 * 点击外部关闭
 * @param e 事件对象
 */
const handleClickOutside = (e: Event) => {
  const mainEl = document.querySelector('.form-drag-verify') as HTMLElement;
  if (!mainEl.contains(e.target as HTMLElement)) {
    isShow.value = false;
  }
};

const verifyInit = () => {
  isShow.value = true;
  isEnd.value = false;
  getCaptcha();
};

const getVerify = (isSuccess: boolean) => {
  verify.value = isSuccess;
  isEnd.value = true;
  setTimeout(() => {
    isShow.value = false;
  }, 1000);
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="form-drag-verify">
    <section class="w-full flex justify-center items-center gap-2" @click="verifyInit">
      <icon-click-tap v-if="!isEnd" fill="#228be6" class="animate-bounce" />
      <icon-check-one v-else-if="verify" fill="#40c057" />
      <icon-close-one v-else fill="#f03e3e" />
      <span> 点击进行验证 </span>
    </section>
    <section class="form-drag-verify-content" v-if="isShow">
      <rify-drag-verify
        :width="width"
        :height="height"
        :options="options"
        @handleRest="getCaptcha"
        @handleVerify="getVerify"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
.form-drag-verify {
  @apply relative rounded-full border border-slate-300 p-2 cursor-pointer;

  & .form-drag-verify-content {
    @apply absolute z-10 left-2 bottom-12 drop-shadow-xl;
  }
}
</style>
