<script lang="ts" setup>
import registerBg from '@/assets/images/register-bg.svg';
import cricle from '@/assets/images/cricle.svg';
import triangle from '@/assets/images/triangle.svg';
</script>

<template>
  <main class="register-body">
    <div class="register-card">
      <section class="register-info">
        <div class="register-info-body">
          <h1>Rapidify-Vue</h1>
          <n-form>
            <div class="register-item-outer">
              <n-form-item>
                <article class="register-item">
                  <icon-mail theme="filled" size="16" :strokeWidth="4" />
                  <input class="register-item-input" placeholder="请输入邮箱" type="text" />
                </article>
              </n-form-item>
              <n-form-item>
                <article class="register-item">
                  <icon-lock-one theme="filled" size="16" :strokeWidth="4" />
                  <input class="register-item-input" placeholder="请输入密码" />
                </article>
              </n-form-item>
              <n-form-item>
                <article class="register-item">
                  <icon-lock theme="filled" size="16" :strokeWidth="4" />
                  <input class="register-item-input" placeholder="请再次输入密码" />
                </article>
              </n-form-item>
            </div>
          </n-form>
          <button class="register-button">注册</button>
          <span class="register-to-login">
            <p>已有账号, </p>
            <n-button type="primary" text @click="$router.push({ name: 'login' })">立刻登录</n-button>
          </span>
        </div>
      </section>
      <section class="register-bg">
        <article class="register-bg-body">
          <span class="register-bg-symbol">
            <img :src="cricle" alt="" />
          </span>
          <span class="register-bg-symbol">
            <img :src="triangle" alt="" />
          </span>
          <span class="register-bg-symbol">
            <img :src="triangle" alt="" />
          </span>
          <span class="register-bg-symbol">
            <img :src="cricle" alt="" />
          </span>
          <img class="register-bg-img" :src="registerBg" alt="" />
        </article>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.register-body {
  @apply w-full h-full flex justify-center items-center;

  & .register-card {
    box-shadow: 0 -10px 15px 20px rgb(0 0 0 / 0.1), 0 10px 15px 20px rgb(0 0 0 / 0.1);
    @apply w-1/2 min-w-[24rem] lg:w-auto lg:grid grid-cols-2 rounded-xl bg-white;

    & .register-info {
      @apply flex flex-col justify-center items-center p-10 lg:px-0;

      & .register-info-body {
        @apply w-full lg:w-3/4 flex flex-col gap-3;

        & h1 {
          @apply my-3 text-center lg:uppercase text-3xl font-extrabold;
        }

        & .register-operate {
          @apply flex justify-between items-center w-full;
        }

        & .register-button {
          @apply w-full py-3 bg-blue-500 rounded-full text-white;
        }

        & .register-item-outer {
          @apply grid grid-rows-3;
        }

        & .register-item {
          @apply w-full inline-flex items-center gap-3 bg-slate-200 px-5 rounded-full;

          & .register-item-input {
            @apply w-full grow bg-transparent py-3 focus-visible:outline-none;

            &::placeholder {
              @apply left-5;
            }
          }
        }

        & .register-to-login {
          @apply flex justify-center items-center gap-2 mt-5 text-gray-500;

          & p {
            @apply text-sm select-none;
          }
        }
      }
    }

    & .register-bg {
      @apply hidden lg:flex justify-center items-center col-span-1;

      & .register-bg-body {
        @apply relative w-40 h-40 flex justify-center items-center rounded-full;
        background-color: #f0f0f0;

        & .register-bg-symbol {
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

        & .register-bg-img {
          @apply w-2/3;
        }
      }
    }
  }
}
</style>
