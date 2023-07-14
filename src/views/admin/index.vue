<script lang="ts" setup>
import * as echarts from 'echarts';
import { AlignBottomTwo, Mark, Rss, StarOne } from '@icon-park/vue-next';
import { assess } from './echarts';
import pomeluce from '@/assets/pomeluce.svg';
import logo from '@/assets/images/admin-logo.svg';

/* 数据统计 */
const statisticList = [
  {
    label: '本周访问量',
    icon: { component: AlignBottomTwo, attribute: { class: 'text-blue-500', theme: 'filled', size: '24' } },
    value: 9829078039,
    type: 'up',
    footer: '较上周相比',
    tag: '73%',
  },
  {
    label: '本月订阅人数',
    icon: { component: Rss, attribute: { class: 'text-green-500', theme: 'filled', size: '24' } },
    value: 8207,
    type: 'up',
    footer: '较上月相比',
    tag: '6%',
  },
  {
    label: '今日活跃人数',
    icon: { component: Mark, attribute: { class: ' text-violet-500', theme: 'filled', size: '24' } },
    value: 49039,
    type: 'down',
    footer: '较昨天相比',
    tag: '14%',
  },
  {
    label: '今日 star 数',
    icon: { component: StarOne, attribute: { class: 'text-yellow-500', size: '24' } },
    value: 582039,
    type: 'down',
    footer: '较昨天相比',
    tag: '23%',
  },
];

const { qeuryAssessInfo } = useDashboard();

onMounted(async () => {
  const { data: source } = await qeuryAssessInfo();
  echarts.init(document.querySelector('#card1') as HTMLDivElement).setOption(assess(source));
  echarts.init(document.querySelector('#card2') as HTMLDivElement).setOption(assess(source));
  echarts.init(document.querySelector('#card3') as HTMLDivElement).setOption(assess(source));
  echarts.init(document.querySelector('#card4') as HTMLDivElement).setOption(assess(source));
});
</script>

<template>
  <main>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <rify-card class="row-span-2 col-span-2">
        <div class="flex justify-between items-center px-5 py-5">
          <div class="flex flex-col gap-4">
            <article class="flex items-center gap-2">
              <n-image preview-disabled :src="pomeluce" class="w-6 h-6" />
              <span class="uppercase font-semibold text-2xl">rapidify-vue</span>
            </article>
            <div class="text-lg">开箱即用的前后台脚手架</div>
            <article class="flex flex-col gap-3 text-sm text-gray-800 opacity-90">
              <span class="line-clamp-1"> <icon-dot /> 基于 Vue、Typescript、NaiveUI、Pinia 构建</span>
              <span class="line-clamp-1"> <icon-dot /> 集成富文本、Markdown、VisualTabel、在线 Excel</span>
              <span class="line-clamp-1"> <icon-dot /> 采用 TailwindCss 进行样式控制, 方便快捷</span>
              <span class="line-clamp-1"> <icon-dot /> 移动端适配, 响应式布局</span>
            </article>
          </div>
          <n-image preview-disabled :src="logo" class="hidden md:flex w-56" />
        </div>
      </rify-card>
      <statistic
        v-for="{ label, icon, value, type, footer, tag } in statisticList"
        :label="label"
        :icon="icon"
        :value="value"
        :type="type"
        :footer="footer"
        :tag="tag"
      />
    </div>
    <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
      <rify-card>
        <template #title>单日用户访问量曲线图</template>
        <div id="card1" class="h-72"></div>
      </rify-card>
      <rify-card>
        <template #title>单日用户访问量曲线图</template>
        <div id="card2" class="h-72"></div>
      </rify-card>
      <rify-card>
        <template #title>单日用户访问量曲线图</template>
        <div id="card3" class="h-72"></div>
      </rify-card>
      <rify-card>
        <template #title>单日用户访问量曲线图</template>
        <div id="card4" class="h-72"></div>
      </rify-card>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
