<script lang="ts" setup>
import loginBg from '@/assets/images/login-bg.svg';
import cricle from '@/assets/images/cricle.svg';
import triangle from '@/assets/images/triangle.svg';

// 密码显示隐藏标志
const pwdShow = ref<boolean>(true);
// 密码框类型
const passType = ref<string>('password');

/* 切换密码显示隐藏 */
const togglePwdShow = () => {
  pwdShow.value = !pwdShow.value;
  passType.value = passType.value === 'password' ? 'text' : 'password';
};
</script>

<template>
  <main class="login-body">
    <div class="login-card">
      <section class="login-bg">
        <article class="login-bg-body">
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
          <img class="login-bg-img" :src="loginBg" alt="" />
        </article>
      </section>
      <section class="login-info">
        <div class="login-info-body">
          <h1>Rapidify-Vue</h1>
          <n-form>
            <n-form-item>
              <article class="login-item">
                <icon-mail theme="filled" size="16" :strokeWidth="4" />
                <input class="login-item-input" placeholder="请输入邮箱或用户名" type="text" />
              </article>
            </n-form-item>
            <n-form-item>
              <article class="login-item">
                <icon-lock theme="filled" size="16" :strokeWidth="4" />
                <input class="login-item-input" placeholder="请输入密码" :type="passType" />
                <button @click="togglePwdShow">
                  <icon-preview-close v-if="pwdShow" size="16" :strokeWidth="4" />
                  <icon-preview-close-one v-else size="16" :strokeWidth="4" />
                </button>
              </article>
            </n-form-item>
          </n-form>
          <span class="login-operate">
            <n-checkbox>记住密码</n-checkbox>
            <n-button type="primary" text>忘记密码</n-button>
          </span>
          <button class="login-button">登录</button>
          <span class="login-to-register">
            <p>没有账号?</p>
            <n-button type="primary" text>现在注册</n-button>
          </span>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.login-body {
  @apply w-full h-full flex justify-center items-center;

  & .login-card {
    box-shadow: 0 -10px 15px 20px rgb(0 0 0 / 0.1), 0 10px 15px 20px rgb(0 0 0 / 0.1);
    @apply w-1/2 min-w-[20rem] lg:w-auto lg:grid grid-cols-2 bg-white rounded-xl;

    & .login-bg {
      @apply hidden lg:flex justify-center items-center col-span-1;

      & .login-bg-body {
        @apply relative w-40 h-40 flex justify-center items-center bg-gray-200 rounded-full;

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

        & .login-bg-img {
          @apply w-2/3;
        }
      }
    }

    & .login-info {
      @apply flex flex-col justify-center items-center p-10 lg:px-0;

      & .login-info-body {
        @apply w-full lg:w-3/4 flex flex-col gap-3;

        & h1 {
          @apply my-3 text-center lg:uppercase text-3xl font-extrabold;
        }

        & .login-operate {
          @apply flex justify-between items-center w-full;
        }

        & .login-button {
          @apply w-full py-3 bg-blue-500 rounded-full text-white;
        }

        & .login-item {
          @apply w-full inline-flex items-center gap-3 bg-slate-200 px-5 rounded-full;

          & .login-item-input {
            @apply w-full grow bg-transparent py-3 focus-visible:outline-none;
          }
        }

        & .login-to-register {
          @apply flex justify-center items-center gap-2 mt-5 text-gray-500;

          & p {
            @apply text-sm select-none;
          }
        }
      }
    }
  }
}
</style>
