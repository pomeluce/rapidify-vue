<script setup lang="ts">
const { type, placeholder, clearable } = defineProps<{
  type?: 'text' | 'password';
  placeholder?: string;
  clearable?: boolean;
}>();

const inputType = ref<string>(type || 'text');

const value = defineModel<string>();

const isShowPass = ref<boolean>(true);

const isShowClearable = ref<boolean>(false);

const toggleShowPass = () => {
  isShowPass.value = !isShowPass.value;
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};

const hiddenClearable = () => {
  setTimeout(() => {
    isShowClearable.value = false;
  }, 100);
};
</script>

<template>
  <div>
    <slot name="prefix" />
    <input
      v-model="value"
      :placeholder="placeholder"
      :type="inputType"
      @focus="() => (isShowClearable = true)"
      @blur="hiddenClearable"
    />
    <span
      class="cursor-pointer"
      v-if="clearable"
      :style="{ visibility: isShowClearable ? 'visible' : 'hidden' }"
      @click="value = ''"
    >
      <icon-close-one theme="filled" strokeWidth="4" />
    </span>
    <span class="cursor-pointer" v-if="type === 'password'" @click="toggleShowPass">
      <icon-preview-close v-if="isShowPass" size="16" :strokeWidth="4" />
      <icon-preview-close-one v-else size="16" :strokeWidth="4" />
    </span>
    <slot name="suffix" />
  </div>
</template>

<style scoped lang="scss">
div {
  @apply w-full inline-flex items-center gap-3 bg-slate-200 px-5 rounded-full;
  & input {
    @apply w-full bg-transparent py-3 focus-visible:outline-none;
  }
}
</style>
