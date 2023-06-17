import { PropType, SlotsType } from 'vue';
import { MdEditor, EditorProps } from 'md-editor-v3';
import { LoadingFour } from '@icon-park/vue-next';
import 'md-editor-v3/lib/style.css';

const { uploadImage } = useUpload();

const props = {
  conf: Object as PropType<EditorProps>,
  height: {
    type: [String, Number],
    default: '750',
  },
  value: String,
  loading: {
    type: Boolean,
    default: false,
  },
};

/* 默认配置 */
const defaultProps = {
  theme: 'light', // 主题
  previewTheme: 'default', // 预览主题
  codeTheme: 'atom', // 代码主题
  toolbarsExclude: ['github'], // 工具栏隐藏项
  placeholder: '请输入内容', // 占位符
  language: 'zh-CN', // 语言
  showCodeRowNumber: true, // 代码行号
};

const uploadImgs = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
  const res = await Promise.all(
    files.map(async file => {
      const form = new FormData();
      form.append('file', file);
      const { data: url } = await uploadImage(form);
      return url;
    }),
  );
  callback(res.map(item => item));
};

export default defineComponent({
  name: 'rify-mark-editor',
  emits: ['update:value'],
  props: { ...props },
  slots: Object as SlotsType<{
    defToolbalrs?: () => any;
    defFooters?: () => Array<string | VNode | JSX.Element>;
  }>,
  setup(props, { emit, slots: { defToolbalrs, defFooters } }) {
    /* 获取配置项 */
    let { conf, height } = props;

    const modelVal = ref<string>()

    /* 侦听器, 数据更新 */
    watchEffect(() => {
      modelVal.value = props.value;
      emit('update:value', modelVal.value);
    });

    /* 合并配置项 */
    conf = Object.assign({}, defaultProps, conf);

    return () => (
      <div class={'relative'}>
        <MdEditor
          {...conf}
          style={{ height: `${height}px` }}
          v-model={modelVal.value}
          v-slots={{ defToolbalrs, defFooters }}
          onOnUploadImg={conf?.onUploadImg ? conf.onUploadImg : uploadImgs}
        />
        {props.loading ? (
          <div
            style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}
            class={
              'rify-mark-editor__loading absolute left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-center'
            }
          >
            <LoadingFour
              class={'animate-spin duration-300'}
              theme={'filled'}
              strokeWidth={4}
              size={36}
              fill={'#005dd3'}
            />
          </div>
        ) : null}
      </div>
    );
  },
});
