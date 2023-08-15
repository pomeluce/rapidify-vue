<script lang="ts" setup>
import { useFields, yup } from '@/plugins/validate';
import registerBg from '@/assets/images/register-bg.svg';

const user = reactive<{ account: string; password: string; confirmed: string }>({
  account: '',
  password: '',
  confirmed: '',
});

const { errors } = useForm({
  validationSchema: {
    account: yup.string().required().email().label('邮箱'),
    password: yup.string().required().min(8).label('密码'),
    confirmed: yup.string().required().oneOf(['password'], '两次密码不一致').label('确认密码'),
  },
});

useFields(user);
</script>

<template>
  <main class="w-full h-full flex justify-center items-center">
    <div class="register-card">
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
            <form-input ref="password" v-model="user.password" type="password" placeholder="请输入密码" clearable>
              <template #prefix>
                <icon-lock-one theme="filled" size="16" :strokeWidth="4" />
              </template>
            </form-input>
            <form-error :info="errors.password" />
            <form-input v-model="user.confirmed" type="password" placeholder="请再次输入密码" clearable>
              <template #prefix>
                <icon-lock theme="filled" size="16" :strokeWidth="4" />
              </template>
            </form-input>
            <form-error :info="errors.confirmed" />
          </form>
          <button class="w-full py-3 bg-blue-500 rounded-full text-white">注册</button>
          <span class="flex justify-center items-center gap-2 mt-5 text-gray-500">
            <p class="text-sm select-none">已有账号, </p>
            <n-button type="primary" text @click="$router.push({ name: 'login' })">立刻登录</n-button>
          </span>
        </div>
      </section>
      <section class="hidden lg:flex justify-center items-center col-span-1">
        <illustration class="w-48 h-48" :src="registerBg" />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.register-card {
  box-shadow: 0 -10px 15px 20px rgb(0 0 0 / 0.1), 0 10px 15px 20px rgb(0 0 0 / 0.1);
  @apply w-1/2 min-w-[24rem] lg:w-auto lg:grid grid-cols-2 rounded-xl bg-white;
}
</style>
