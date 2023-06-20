import { MdPreview, MdCatalog, MdPreviewProps, MdHeadingId } from 'md-editor-v3';
import { LoadingFour } from '@icon-park/vue-next';
import 'md-editor-v3/lib/preview.css';
import './styles/markPreview.scss';

export interface IMarkPreviewCatalogProps {
  editorId: string; // 必须, 对应编辑器的editorId, 在内部注册目录变化监听事件
  class?: string; // 非必须, 目录组件最外层类名
  mdHeadingId?: MdHeadingId; // 非必须, 特殊化编辑器标题的算法, 与编辑器相同
  scrollElement?: string | HTMLElement; // 非必须, 为字符时应是一个元素选择器; 仅预览模式中, 整页滚动时, 设置为document.documentElement
  theme?: 'light' | 'dark'; // 非必须, 当需要切换主题时提供, 同编辑器的theme
  offsetTop?: number; // 非必须，标题距离顶部该像素时高亮当前目录项, 默认 20 像素
  scrollElementOffsetTop?: number; // 非必须, 滚动区域的固定顶部高度, 默认 0
}

const props = {
  preview: Object as PropType<MdPreviewProps>,
  catalog: Object as PropType<IMarkPreviewCatalogProps>,
  value: String,
  height: {
    type: [String, Number],
    default: '750',
  },
  loading: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'rify-mark-preview',
  props: { ...props },
  setup(props) {
    const { height, preview, catalog } = props;
    return () => (
      <main style={{ height: `${height}px` }} class={'flex border rounded overflow-auto'}>
        <MdPreview {...preview} modelValue={props.value} />
        {props.value ? (
          <div class={'rify-mark-preview-menu'}>
            <section class={'px-[5px] py-3 font-bold'}>本页目录</section>
            <MdCatalog class={'font-medium text-sm text-gray-800 opacity-80'} {...catalog} />
          </div>
        ) : null}
        {props.loading ? (
          <div
            style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}
            class={
              'rify-mark-preview__loading absolute left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-center'
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
      </main>
    );
  },
});
