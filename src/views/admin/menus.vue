<script setup lang="ts">
const data = [
  {
    label: '前台菜单',
    key: '1',
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
    <n-tabs type="line" size="large" :tabsPadding="20" pane-style="padding: 20px" animate>
      <n-tab-pane name="reception" tab="前台菜单">
        <div id="menus-pane" class="grid grid-cols-[auto_1fr] grid-flow-row-dense">
          <nav class="relative h-full">
            <n-tree
              block-line
              :data="data"
              :default-expanded-keys="defaultExpandedKeys"
              checkable
              expand-on-click
              selectable
            />
          </nav>
          <section class=""> </section>
        </div>
      </n-tab-pane>
      <n-tab-pane name="backstage" tab="后台菜单"> 后台 </n-tab-pane>
    </n-tabs>
  </rify-card>
</template>

<style scoped lang="scss">
.menus-pane {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>
