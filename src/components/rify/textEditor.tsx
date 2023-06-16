import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';

type InsertFnType = (url: string, alt: string, href: string) => void;

/* props */
const props = {
  modeValue: {
    type: String,
    default: '',
  },
  height: {
    type: Number,
    default: 600,
  },
  placeholder: {
    type: String,
    default: '请输入内容...',
  },
  urlArray: {
    type: Array<string>,
    default: () => [],
  },
};

export default defineComponent({
  name: 'rify-text-editor',
  emits: ['update:modeValue', 'update:urlArray'],
  props: { ...props },
  setup(props, { emit }) {
    const { height, placeholder } = props;
    const { uploadImage } = useUpload();

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
      placeholder,
    };

    // 内容 HTML
    const modelVal = ref<string>(
      /^(<a-z][+)(^[]<+)*(?:>|[\s\/])/i.test(props.modeValue) ? props.modeValue : `<p>${props.modeValue}</p>`,
    );

    // 图片地址数组
    const images = ref<string[]>(props.urlArray);

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

    /* 侦听器, 侦听数据变化, 实现数据双向绑定 */
    watch([() => modelVal.value, () => images.value], ([_, url]) => {
      emit('update:modeValue', editorRef.value?.getHtml());
      emit('update:urlArray', url);
    });

    return () => (
      <div class={'border rounded z-50'}>
        <Toolbar class={'border-b-2'} editor={editorRef.value} defaultConfig={toolbarConfig} mode={mode.value} />
        <Editor
          style={{ height: `${height}px` }}
          v-model={modelVal.value}
          defaultConfig={editorConfig}
          mode={mode.value}
          onOnCreated={handleCreated}
        />
      </div>
    );
  },
});
