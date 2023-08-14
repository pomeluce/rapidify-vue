<script lang="ts" setup>
import { useFields, yup } from '@/plugins/validate';
import loginBg from '@/assets/images/login-bg.svg';

const user = reactive<{ account: string; password: string }>({
  account: '',
  password: '',
});

const { errors } = useForm({
  validationSchema: {
    account: yup.string().required().email().label('邮箱'),
    password: yup.string().required().min(8).label('密码'),
  },
});

useFields(user);
</script>

<template>
  <main class="w-full h-full flex justify-center items-center">
    <div class="login-card">
      <section class="hidden lg:flex justify-center items-center col-span-1">
        <illustration :src="loginBg" />
      </section>
      <section class="flex flex-col justify-center items-center p-10 lg:px-0">
        <div class="w-full lg:w-3/4 flex flex-col gap-3">
          <h1 class="my-3 text-center lg:uppercase text-3xl font-extrabold">Rapidify-Vue</h1>
          <form class="flex flex-col gap-3 py-5" @submit.prevent="">
            <form-input v-model="user.account" type="text" placeholder="请输入邮箱" clearable>
              <template #prefix>
                <icon-mail theme="filled" size="16" :strokeWidth="4" />
              </template>
            </form-input>
            <form-error :info="errors.account" />
            <form-input v-model="user.password" type="password" placeholder="请输入密码" clearable>
              <template #prefix>
                <icon-lock theme="filled" size="16" :strokeWidth="4" />
              </template>
            </form-input>
            <form-error :info="errors.password" />
            <span class="flex justify-between items-center px-2">
              <n-checkbox> 记住密码 </n-checkbox>
              <n-button type="primary" text>忘记密码</n-button>
            </span>
            <button class="w-full mt-5 py-3 bg-blue-500 rounded-full text-white">登录</button>
          </form>
          <span class="flex justify-center items-center gap-2 mt-5 text-gray-500">
            <p class="text-sm select-none">没有账号?</p>
            <n-button type="primary" text @click="$router.push({ name: 'register' })">现在注册</n-button>
          </span>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.login-card {
  box-shadow: 0 -10px 15px 20px rgb(0 0 0 / 0.1), 0 10px 15px 20px rgb(0 0 0 / 0.1);
  @apply w-1/2 min-w-[20rem] lg:w-auto lg:grid grid-cols-2 rounded-xl bg-white;
}
</style>
