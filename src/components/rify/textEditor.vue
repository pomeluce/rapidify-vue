<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

defineOptions({ name: 'rify-text-editor' });

interface IEditorProps {
  modeValue: string;
  height?: number;
  placeholder?: string;
  urlArray?: string[];
}

type InsertFnType = (url: string, alt: string, href: string) => void;

const props = withDefaults(defineProps<IEditorProps>(), {
  modeValue: '',
  height: 500,
  placeholder: '请输入内容...',
  urlArray: undefined,
});
const { uploadImage } = useUpload();
const emit = defineEmits(['update:modeValue', 'update:urlArray']);

// 编辑器组件实例
const editorRef = shallowRef<IDomEditor | undefined>();
// 创建工具栏
const mode = ref<string>('default');

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = { excludeKeys: ['group-video', 'undo', 'redo'] };
// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    // 文件上传
    uploadImage: {
      async customUpload(file: File, insertFn: InsertFnType) {
        const formData = new FormData();
        formData.append('file', file);
        const { data: url } = await uploadImage(formData);
        // 解构赋值进行添加图片, 不要直接 push;
        images.value = [...images.value, url];
        insertFn(url, '', url);
      },
    },
  },
  placeholder: props.placeholder,
};

/**
 * 记录 editor 实例, 重要!
 * @param editor 编辑器实例
 */
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor) editor.destroy();
});

/**
 * 计算属性, 修改和返回图片数组
 * @type {WritableComputedRef<string[]>}
 */
const images = computed({
  get() {
    return props.urlArray || [];
  },
  set(value: string[]) {
    emit('update:urlArray', value);
  },
});

/**
 * 计算属性, 修改和返回编辑器的值
 * @type {WritableComputedRef<string>}
 */
const value = computed({
  get() {
    return /^<([a-z]+)([^<]+)*(?:>|[\s\/])/i.test(props.modeValue) ? props.modeValue : `<p>${props.modeValue}</p>`;
  },
  set(value: string) {
    emit('update:modeValue', editorRef.value?.getHtml());
  },
});
</script>

<template>
  <rify-card>
    <Toolbar class="border-b-2" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      :style="`height: ${props.height}px;`"
      v-model="value"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </rify-card>
</template>

<style lang="scss" scoped></style>
