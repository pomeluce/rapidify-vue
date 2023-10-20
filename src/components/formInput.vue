<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | undefined;
  type?: 'text' | 'password';
  placeholder?: string;
  clearable?: boolean;
}>();

const emits = defineEmits<{
  'update:modelValue': [value: string | number | undefined];
}>();

const { type, placeholder, clearable } = props;

const inputType = ref<string>(type || 'text');

const isShowPass = ref<boolean>(true);

const isShowClearable = ref<boolean>(false);

/* 密码显示方法切换 */
const toggleShowPass = () => {
  isShowPass.value = !isShowPass.value;
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};

/* 延迟隐藏清除按钮, 保证清除按钮事件触发 */
const hiddenClearable = () => {
  setTimeout(() => {
    isShowClearable.value = false;
  }, 200);
};
</script>

<template>
  <div>
    <slot name="prefix" />
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :type="inputType"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="() => (isShowClearable = true)"
      @blur="hiddenClearable"
    />
    <span class="cursor-pointer" v-if="clearable" :style="{ visibility: isShowClearable ? 'visible' : 'hidden' }" @click="$emit('update:modelValue', '')">
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
