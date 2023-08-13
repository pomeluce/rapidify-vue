<script lang="ts" setup>
import { useFields, yup } from '@/plugins/validate';
import loginBg from '@/assets/images/login-bg.svg';
import cricle from '@/assets/images/cricle.svg';
import triangle from '@/assets/images/triangle.svg';

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
        <article class="relative w-40 h-40 bg-[#f0f0f0] flex justify-center items-center rounded-full">
          <span class="login-bg-symbol">
            <img :src="cricle" alt="" />
          </span>
          <span class="login-bg-symbol">
            <img :src="triangle" alt="" />
          </span>
          <span class="login-bg-symbol">
            <img :src="triangle" alt="" />
          </span>
          <span class="login-bg-symbol">
            <img :src="cricle" alt="" />
          </span>
          <img class="w-2/3" :src="loginBg" alt="" />
        </article>
      </section>
      <section class="flex flex-col justify-center items-center p-10 lg:px-0">
        <div class="w-full lg:w-3/4 flex flex-col gap-3">
          <h1 class="my-3 text-center lg:uppercase text-3xl font-extrabold">Rapidify-Vue</h1>
          <form class="flex flex-col gap-3 py-5">
            <form-input v-model="user.account" type="text" placeholder="请输入邮箱" clearable>
              <template #prefix>
                <icon-mail theme="filled" size="16" :strokeWidth="4" />
              </template>
            </form-input>
            <form-error :info="errors.account" />
            <form-input type="password" placeholder="请输入密码" clearable>
              <template #prefix>
                <icon-lock theme="filled" size="16" :strokeWidth="4" />
              </template>
            </form-input>
            <form-error info="" />
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

  & .login-bg-symbol {
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
}
</style>
