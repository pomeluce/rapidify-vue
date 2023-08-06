<script setup lang="ts">
import failed from '@/assets/images/failed.svg';

const message = ref<String>('请检查下面的信息是否填写正确, 并进行相应的修改');
</script>

<template>
  <rify-card>
    <rify-result title="操作失败" :message="message">
      <template #icon> <img class="w-24" :src="failed" /> </template>
      <div class="flex flex-col gap-3">
        <span> 你提交的内容有如下错误: </span>
        <section class="flex flex-col gap-2 px-3">
          <article class="flex items-center gap-2">
            <icon-attention theme="outline" size="20" fill="#f0a020" strokeLinecap="butt" />
            <span>你的账户已被冻结 </span>
          </article>
          <article class="flex items-center gap-2">
            <icon-attention theme="outline" size="20" fill="#f0a020" strokeLinecap="butt" />
            <span>你的账户还不具备申请资格 </span>
          </article>
        </section>
      </div>
      <template #opreate>
        <section class="flex justify-center gap-3">
          <n-button type="error" size="large" @click="$router.push('/')">返回首页</n-button>
          <n-button size="large">查看详情</n-button>
        </section>
      </template>
    </rify-result>
  </rify-card>
</template>

<style scoped lang="scss"></style>
