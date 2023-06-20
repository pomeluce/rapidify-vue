import { PropType, SlotsType } from 'vue';
import { MdEditor, EditorProps, ExposeParam } from 'md-editor-v3';
import { LoadingFour, DownOne } from '@icon-park/vue-next';
import 'md-editor-v3/lib/style.css';
import './styles/markEditor.scss';

const { uploadImage } = useUpload();

/* props define */
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
  toolbarsExclude: ['fullscreen', 'github'], // 工具栏隐藏项
  placeholder: '请输入内容', // 占位符
  language: 'zh-CN', // 语言
  showCodeRowNumber: true, // 代码行号
};

/**
 * 上传图片
 * @param files 上传的文件数组
 * @param callback 回调函数
 */
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

/* 工具栏响应 */
const dynamicToolbar = (toolbar: Element, leftSize: number) => {
  // 获取左侧工具栏
  const leftToolbar = toolbar.querySelector('.md-editor-toolbar-left')!;
  // 获取右侧工具栏
  const rightToolbar = toolbar.querySelector('.md-editor-toolbar-right')!;
  // 获取下拉菜单面板
  const dropdownPanel = toolbar.querySelector('.md-editor-toolbar-dropdown-panel')!;
  // 显示下拉菜单
  dropdownPanel.parentElement!.classList.remove('!hidden');

  // 获取所有下拉项
  const downItems = Array.from([...leftToolbar.children, ...rightToolbar.children, ...dropdownPanel.children]);

  // 获取当前 toolbar 宽度
  const toolbarWidth = toolbar.clientWidth;
  // 定义下拉项宽度总和
  let downItemsWidth = dropdownPanel.parentElement!.clientWidth;

  // 获取超出项的索引
  let mark = downItems.findIndex(item => {
    if (!item.className.includes('md-editor-dropdown')) {
      downItemsWidth +=
        Number.parseFloat(getComputedStyle(item).marginLeft) +
        item.clientWidth +
        Number.parseFloat(getComputedStyle(item).marginRight);
    }
    return downItemsWidth > toolbarWidth;
  });

  // 判断是否含有下拉项
  if (mark === -1) {
    // 修改索引位置
    mark = downItems.length;
    // 隐藏下拉按钮
    dropdownPanel.parentElement!.classList.add('!hidden');
  }

  // 置空工具栏
  leftToolbar.innerHTML = '';
  rightToolbar.innerHTML = '';
  // 填充下拉项
  downItems.slice(0, mark).forEach((item, index) => {
    // 移除隐藏样式
    item.className.includes('md-editor-divider') && item.classList.remove('!hidden');
    // 填充工具栏
    if (index < leftSize) leftToolbar.appendChild(item);
    else rightToolbar.appendChild(item);
    // 隐藏最后一个分割线
    mark - 1 === index && item.className.includes('md-editor-divider') && item.classList.add('!hidden');
  });

  // 置空下拉面板
  dropdownPanel.innerHTML = '';
  // 初始化下拉项宽度和
  let dropMenuItemWidth = 0;
  // 填充下拉项
  downItems.slice(mark).forEach(item => {
    // 添加隐藏样式
    item.className.includes('md-editor-divider') && item.classList.add('!hidden');
    // 填充下拉面板
    dropdownPanel.appendChild(item);
    // 累加下拉项宽度总和
    dropMenuItemWidth +=
      Number.parseFloat(getComputedStyle(item).marginLeft) +
      item.clientWidth +
      Number.parseFloat(getComputedStyle(item).marginRight);
  });
  dropdownPanel.removeAttribute('style');
  // 判断是否需要修改下拉面板宽度
  if (dropdownPanel.clientWidth > dropMenuItemWidth) {
    const style = (dropdownPanel as HTMLElement).style;
    style.width = `${dropMenuItemWidth + Number.parseFloat(getComputedStyle(dropdownPanel).paddingLeft) * 2}px`;
    style.flexWrap = 'nowrap';
  }

  // 给下拉菜单添加事件
  dropdownPanel.parentElement!.addEventListener('mouseenter', () => {
    dropdownPanel.classList.remove('md-editor-toolbar-dropdown-panel-hidden');
  });
  dropdownPanel.parentElement!.addEventListener('mouseleave', () => {
    dropdownPanel.classList.add('md-editor-toolbar-dropdown-panel-hidden');
  });
};

/* export */
export default defineComponent({
  name: 'rify-mark-editor',
  emits: ['update:value'],
  props: { ...props },
  slots: Object as SlotsType<{
    defToolbalrs?: () => any;
    defFooters?: () => Array<string | VNode | JSX.Element>;
  }>,
  /* setup */
  setup(props, { emit, slots: { defToolbalrs, defFooters } }) {
    /* 获取配置项 */
    let { conf, height } = props;

    // MdEditor 实例 ref
    const editorRef = ref<ExposeParam>();
    // DOM 尺寸监听实例
    const resizeObs = ref<ResizeObserver>();

    /* 计算属性: 获取 props.value, 并实时更新 */
    const modelVal = computed({ get: () => props.value, set: val => emit('update:value', val) });

    /* 合并配置项 */
    conf = Object.assign({}, defaultProps, conf);

    /* resizeObs 实例挂载, 监听方法调用*/
    const resize = (el: Element, leftSize: number) => {
      resizeObs.value = new ResizeObserver(() => dynamicToolbar(el, leftSize));
      resizeObs.value.observe(el.parentElement!);
    };

    /* 移动端响应式显示 toolbar */
    const toolbarResponsive = () => {
      // 创建下拉菜单实例
      const mdDropdown = document.createElement('div');
      // 设置 class
      mdDropdown.className = 'md-editor-toolbar-dropdown';
      // 创建下拉按钮
      const dropdownBtn = document.createElement('span');
      // 设置 class
      dropdownBtn.className = 'md-editor-toolbar-dropdown-btn';
      // 设置内容
      createApp(DownOne, { theme: 'filled', size: '20', strokeWidth: 4, fill: '#6e767e' }).mount(dropdownBtn);
      // 挂载到下拉菜单实例
      mdDropdown.appendChild(dropdownBtn);
      // 创建菜单面板
      const dropdownPanel = document.createElement('div');
      // 设置 class
      dropdownPanel.className = 'md-editor-toolbar-dropdown-panel md-editor-toolbar-dropdown-panel-hidden';
      // 挂载到下拉菜单实例
      mdDropdown.appendChild(dropdownPanel);
      // 获取 toolbar 实例
      const toolbar = document.querySelector('.md-editor-toolbar')!;
      // 挂载到 toolbar
      toolbar.appendChild(mdDropdown);
      // 尺寸变化时响应
      resize(toolbar, toolbar.firstElementChild!.children.length);
    };

    /* 移动端, 编辑与预览布局显示切换 */
    const layoutResponsive = () => {
      // const preview = document.querySelector('#md-editor-v3-preview-wrapper');
      const editor = document.querySelector('.md-editor-input-wrapper')!;

      const documentEl = document.documentElement;

      // 判断尺寸, 关闭预览
      documentEl.clientWidth < 768 && editorRef.value?.togglePreview(false);

      // 监听尺寸变化
      window.addEventListener('resize', () => {
        if (documentEl.clientWidth < 768) {
          editorRef.value?.togglePreview(false);
        } else {
          editor.setAttribute('data-show', `${true}`);
        }
      });

      // 修改预览按钮事件
      editorRef.value?.on('preview', status => {
        if (documentEl.clientWidth < 768) {
          editorRef.value?.togglePreview(status);
          editor.setAttribute('data-show', `${!status}`);
        }
      });
    };

    /* MdEditor 挂载完成, 事件调用 */
    const vnodeMounted = () => {
      nextTick(() => {
        toolbarResponsive();
        layoutResponsive();
      });
    };

    /* DOM 销毁, 停止 resizeObs */
    onBeforeUnmount(() => {
      !!resizeObs.value && resizeObs.value.disconnect();
    });

    return () => (
      <div class={'relative'}>
        <MdEditor
          {...conf}
          ref={editorRef}
          style={{ height: `${height}px` }}
          v-model={modelVal.value}
          v-slots={{ defToolbalrs, defFooters }}
          onOnUploadImg={conf?.onUploadImg ? conf.onUploadImg : uploadImgs}
          onVnodeMounted={vnodeMounted}
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
