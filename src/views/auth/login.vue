<script lang="ts" setup>
import loginBg from '@/assets/images/login-bg.svg';

const { loginValid } = useValidate();
const { login } = useAuth();

const user = ref<{ account: string; password: string }>({
  account: '',
  password: '',
});

const {
  errors,
  fields: { account, password },
  meta,
} = loginValid(user);

const valided = ref<boolean>(false);

const disabled = () => meta.value.touched && meta.value.valid && valided.value;
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
          <form class="flex flex-col gap-3 py-5" @submit.prevent="login(user)">
            <form-input v-bind="account" type="text" placeholder="请输入邮箱" clearable>
              <template #prefix>
                <icon-mail theme="filled" size="16" :strokeWidth="4" />
              </template>
            </form-input>
            <form-error :info="errors.account" />
            <form-input v-bind="password" type="password" placeholder="请输入密码" clearable>
              <template #prefix>
                <icon-lock theme="filled" size="16" :strokeWidth="4" />
              </template>
            </form-input>
            <form-error :info="errors.password" />
            <form-drag-verify :width="300" :height="200" :length="32" @handleVerify="(result: boolean) => (valided = result)" />
            <span class="flex justify-between items-center px-2">
              <n-checkbox> 记住密码 </n-checkbox>
              <n-button type="primary" text>忘记密码</n-button>
            </span>
            <button :disabled="!disabled()">
              <n-button class="w-full rounded-full" type="primary" size="large" :disabled="!disabled()">登录</n-button>
            </button>
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
  box-shadow:
    0 -10px 15px 20px rgb(0 0 0 / 0.1),
    0 10px 15px 20px rgb(0 0 0 / 0.1);
  @apply w-1/2 min-w-[20rem] lg:w-auto lg:grid grid-cols-2 rounded-xl bg-white;
}
</style>
