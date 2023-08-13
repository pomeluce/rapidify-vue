<script setup lang="ts">
import { validate, yup } from '@/plugins/validate';

const { handleSubmit, errors } = validate.useForm({
  validationSchema: {
    account: yup.string().required().email().label('邮箱'),
  },
});
const { value: account } = validate.useField('account');

const test = () =>
  handleSubmit(val => {
    console.log(val);
  });
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
  </rify-card>
</template>

<style scoped lang="scss"></style>
