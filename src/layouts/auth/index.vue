<script lang="ts" setup></script>

<template>
  <main class="login-outer">
    <div>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="wave-list">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
    <section class="login-inner">
      <router-view #default="{ Component, route }">
        <transition name="fade">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </section>
    <footer></footer>
  </main>
</template>

<style lang="scss" scoped>
.login-outer {
  background-image: linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%);
  @apply relative;

  & .login-inner {
    @apply absolute w-full h-full left-0 top-0;
  }

  & div {
    @apply w-full h-[80vh] relative;

    & .waves {
      @apply absolute w-full max-h-36 bottom-0;

      & .wave-list > use {
        /* 使use元素执行move-forever动画 */
        animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
      }
      & .wave-list > use:nth-child(1) {
        /* 延迟2秒启动动画  */
        animation-delay: -2s;
        /* 设置动画持续时间为7秒 */
        animation-duration: 7s;
      }
      & .wave-list > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
      }

      & .wave-list > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
      }

      & .wave-list > use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
      }
    }
  }

  & footer {
    @apply w-full h-[20vh] bg-white;
  }
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
