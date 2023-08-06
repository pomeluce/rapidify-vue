<script setup lang="ts">
import info from '@/assets/images/info.svg';

const message = ref<String>('本次提交，将在24小时候内自动转入对方账户，如操作失误，请及时撤回');
</script>

<template>
  <rify-card>
    <rify-result title="提示信息" :message="message">
      <template #icon> <img class="w-24" :src="info" /> </template>
      <div class="flex flex-col gap-3">
        <span> 您提交的内容如下: </span>
        <section class="flex flex-col gap-2 px-3">
          <article class="flex items-center gap-2">
            <icon-check-one theme="outline" size="20" fill="#337ffe" strokeLinecap="butt" />
            <span>中国建设银行一卡通 (****5426) 转出 2370.00 元, 当前账户余额：￥1980元</span>
            <n-button type="primary" text size="small">立刻撤回</n-button>
          </article>
          <article class="flex items-center gap-2">
            <icon-check-one theme="outline" size="20" fill="#337ffe" strokeLinecap="butt" />
            <span>中国招商银行一卡通 (****8945) 转出 17790.45 元, 当前账户余额：￥80元</span>
            <n-button type="primary" text size="small">立刻撤回</n-button>
          </article>
        </section>
      </div>
      <template #opreate>
        <section class="flex justify-center gap-3">
          <n-button type="primary" size="large" @click="$router.push('/')">返回首页</n-button>
          <n-button size="large">查看详情</n-button>
        </section>
      </template>
    </rify-result>
  </rify-card>
</template>

<style scoped lang="scss"></style>
