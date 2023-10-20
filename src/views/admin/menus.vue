<script setup lang="ts">
import { DashboardOne } from '@icon-park/vue-next';
import { TreeOption } from 'naive-ui';

const data: TreeOption[] = [
  {
    label: '前台菜单',
    key: '1',
    prefix: () => {
      return h(DashboardOne, { fill: '#000' });
    },
    children: [
      {
        label: '首页',
        key: '1-1',
        children: [
          {
            label: '首页',
            key: '1-1-1',
          },
        ],
      },
      {
        label: '产品',
        key: '1-2',
        children: [
          {
            label: '产品列表',
            key: '1-2-1',
          },
          {
            label: '产品详情',
            key: '1-2-2',
          },
        ],
      },
      {
        label: '关于',
        key: '1-3',
        children: [
          {
            label: '关于我们',
            key: '1-3-1',
          },
          {
            label: '联系我们',
            key: '1-3-2',
          },
        ],
      },
    ],
  },
  {
    label: '后台菜单',
    key: '2',
    children: [
      {
        label: '首页',
        key: '2-1',
        children: [
          {
            label: '首页',
            key: '2-1-1',
          },
        ],
      },
      {
        label: '产品',
        key: '2-2',
        children: [
          {
            label: '产品列表',
            key: '2-2-1',
          },
          {
            label: '产品详情',
            key: '2-2-2',
          },
        ],
      },
      {
        label: '关于',
        key: '2-3',
        children: [
          {
            label: '关于我们',
            key: '2-3-1',
          },
          {
            label: '联系我们',
            key: '2-3-2',
          },
        ],
      },
    ],
  },
];

const defaultExpandedKeys = ['1', '1-1', '1-2', '1-3', '2', '2-1', '2-2', '2-3'];
</script>

<template>
  <rify-card>
    <n-tabs class="h-full" type="line" size="large" :tabsPadding="20" pane-style="padding: 20px" animated>
      <n-tab-pane name="reception" tab="前台菜单">
        <div class="grid grid-cols-[auto_1fr] gap-x-10">
          <nav>
            <n-tree block-line :data="data" :default-expanded-keys="defaultExpandedKeys" expand-on-click selectable />
          </nav>
          <section class="px-5 py-3 border-l">
            <n-form label-placement="left">
              <section class="flex gap-3">
                <n-form-item label="菜单名称">
                  <n-input type="text"></n-input>
                </n-form-item>
                <n-form-item label="菜单地址">
                  <n-input type="text"></n-input>
                </n-form-item>
                <n-form-item label="菜单图标">
                  <n-input type="text"></n-input>
                </n-form-item>
              </section>
            </n-form>
          </section>
        </div>
      </n-tab-pane>
      <n-tab-pane name="backstage" tab="后台菜单"> 后台 </n-tab-pane>
    </n-tabs>
  </rify-card>
</template>

<style scoped lang="scss"></style>
