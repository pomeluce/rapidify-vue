<script setup lang="ts">
import { EditorProps, MdPreviewProps } from 'md-editor-v3';
import { IMarkPreviewCatalogProps } from '@/components/rify/markPreview';
import grammar from '@/assets/static/grammar.md?raw';
import dayjs from 'dayjs';

/* Markdown 配置 */
const value = ref<string>();
const loading = ref<boolean>(false);
const conf = ref<EditorProps>({
  footers: ['markdownTotal', '=', 0, 'scrollSwitch'], // 页脚设置
} as EditorProps);

onBeforeMount(() => {
  loading.value = true;
  setInterval(() => {
    value.value = grammar;
    loading.value = false;
  }, 500);
});

/* 插槽 -> 页脚时间设置 */
const weekNames = {
  'en-US': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  'zh-CN': ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
};
const time = ref<string>(dayjs().format('YYYY-MM-DD HH:mm:ss'));
const text = computed(() => {
  const weekday = dayjs().day();
  const week = weekNames['zh-CN'][weekday > 0 ? weekday - 1 : 6];
  return `${time.value} ${week}`;
});
const $time = setInterval(() => {
  time.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
}, 1_000);

onBeforeUnmount(() => {
  clearInterval($time);
});

/* MarkPreview 配置 */
const previewOptions = ref<MdPreviewProps>({
  editorId: 'preview-only',
} as MdPreviewProps);
const catalogOptions = ref<IMarkPreviewCatalogProps>({
  editorId: 'preview-only',
} as IMarkPreviewCatalogProps);
</script>

<template>
  <rify-card>
    <n-tabs type="line" size="large" :tabsPadding="20" pane-style="padding: 20px">
      <n-tab-pane name="Markdown 编辑器">
        <rify-mark-editor v-model:value="value" :loading="loading" :conf="conf">
          <template #defFooters>
            <span>{{ text }}</span>
          </template>
        </rify-mark-editor>
      </n-tab-pane>
      <n-tab-pane name="Markdown 预览">
        <rify-mark-preview :value="value" :loading="loading" :preview="previewOptions" :catalog="catalogOptions" />
      </n-tab-pane>
    </n-tabs>
  </rify-card>
</template>

<style scoped lang="scss"></style>
