<script setup lang="ts">
import { yup } from '@/plugins/validate';

const { handleSubmit, errors } = useForm({
  validationSchema: {
    account: yup.string().required().email().label('邮箱'),
  },
});
const { value: account } = useField('account');

const test = () =>
  handleSubmit(val => {
    console.log(val);
  });

const isLoading = ref<boolean>(true);

setTimeout(() => {
  isLoading.value = false;
}, 2000);
</script>

<template>
  <rify-card>
    <form @submit="test">
      <form-input v-model="account" />
      <span>{{ errors.account }}</span>
      <!-- <form-input v-model="password" /> -->
      <!-- <span>{{ errors.password }}</span> -->
      <!-- <input class="border border-slate-500" v-model="account" /> -->
      <button class="px-3 py-2">提交</button>
    </form>
    <n-button type="primary" v-rifyLoad="isLoading">测试</n-button>
  </rify-card>
</template>

<style scoped lang="scss"></style>
