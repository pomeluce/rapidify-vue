import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { Down } from '@icon-park/vue-next';
import '@wangeditor/editor/dist/css/style.css';
import './styles/sheet.scss';

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

/* 动态调整工具栏 */
const dynamicToolbar = (barEl: Element) => {
  // 获取下拉菜单组
  const dropMenu = document.querySelector('.w-e-dropdown-menu')!;
  // 显示下拉菜单
  dropMenu.parentElement!.classList.remove('!hidden');

  //  获取当前工具栏的宽度
  const barWidth = barEl.parentElement!.clientWidth;
  // 定义工具项的宽度和
  let totalWidth = dropMenu.parentElement!.clientWidth;
  // 获取所有可显示工具项
  const barItems = Array.from(barEl.children).slice(0, -1);
  // 超出的下拉按钮组
  let dropdownItems: Element[] = Array.from(dropMenu?.children || []);
  // 所有工具项
  const totalMenuItems = [...barItems, ...dropdownItems];

  // 获取超出的工具项索引
  let mark = totalMenuItems.findIndex(item => {
    // 计算宽度和
    totalWidth +=
      Number.parseFloat(getComputedStyle(item).marginLeft) +
      item.clientWidth +
      Number.parseFloat(getComputedStyle(item).marginRight);
    return totalWidth > barWidth;
  });

  // 判断是否含有下拉项
  if (mark === -1) {
    // 修改索引位置
    mark = totalMenuItems.length;
    // 隐藏下拉按钮
    dropMenu.parentElement!.classList.add('!hidden');
  }

  // 置空可显示工具项数组
  barEl.innerHTML = '';
  totalMenuItems.slice(0, mark).forEach((item, index) => {
    // 移除隐藏样式
    item.className.includes('w-e-bar-divider') && item.classList.remove('!hidden');
    (item as HTMLElement).style.visibility = 'visible';
    // 添加到可显示工具项数组
    barEl.appendChild(item);
    // 隐藏最后一个分割线
    mark - 1 === index && item.className.includes('w-e-bar-divider') && item.classList.add('!hidden');
  });
  barEl.appendChild(dropMenu.parentElement!);

  // 置空下拉菜单数组
  dropMenu!.innerHTML = '';
  // 初始化下拉项宽度和
  let dropMenuItemWidth = 0;
  // 移动超出项到下拉按钮组
  totalMenuItems.slice(mark).forEach(item => {
    // 添加隐藏样式
    item.className.includes('w-e-bar-divider') && item.classList.add('!hidden');
    (item as HTMLElement).style.visibility = 'hidden';
    // 添加到下拉按钮组, 但是排除分割线
    dropMenu.appendChild(item);
    // 累加下拉项宽度总和
    dropMenuItemWidth += item.clientWidth;
  });
  dropMenu.removeAttribute('style');
  // 判断是否需要修改下拉面板宽度
  if (dropMenu.clientWidth > dropMenuItemWidth) {
    (dropMenu as HTMLElement).style.width = `${dropMenuItemWidth}px`;
    (dropMenu as HTMLElement).style.flexWrap = 'nowrap';
  }

  // 给下拉菜单设置事件
  dropMenu.parentElement!.addEventListener('mouseenter', () => {
    dropMenu.classList.remove('h-0');
    const childItems = Array.from(dropMenu.children);
    childItems.forEach(item => {
      (item as HTMLElement).style.visibility = 'visible';
    });
  });
  dropMenu.parentElement!.addEventListener('mouseleave', () => {
    dropMenu.classList.add('h-0');
    const childItems = Array.from(dropMenu.children);
    childItems.forEach(item => {
      (item as HTMLElement).style.visibility = 'hidden';
    });
  });
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

    // 子组件加载完成后进行布局响应
    const vnodeUpdated = () => {
      nextTick(() => {
        // 创建下拉按钮父容器
        const dropdownEl = document.createElement('div');
        dropdownEl.className = 'w-e-dropdown';
        // 创建下拉按钮
        const dropdownBtn = document.createElement('div');
        dropdownBtn.className = 'w-e-dropdown-btn';
        createApp(Down).mount(dropdownBtn);
        // 创建下拉菜单子容器
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'w-e-dropdown-menu h-0';
        // 添加下拉按钮和下拉菜单
        dropdownEl.appendChild(dropdownBtn);
        dropdownEl.appendChild(dropdownMenu);
        // 获取工具栏
        const toolbarEl = document.querySelector('.w-e-bar')!;
        // 设置工具栏不换行
        toolbarEl.className += ' !flex-nowrap w-full';
        // 添加下拉按钮
        toolbarEl?.appendChild(dropdownEl);
        // 动态调整工具栏
        dynamicToolbar(toolbarEl!);
        // 监听窗口大小变化事件，更新下拉菜单
        new ResizeObserver(() => dynamicToolbar(toolbarEl!)).observe(toolbarEl.parentElement!);
      });
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
        <Toolbar
          class={'flex justify-between border-b-2'}
          editor={editorRef.value}
          defaultConfig={toolbarConfig}
          mode={mode.value}
          onVnodeUpdated={vnodeUpdated}
        />
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
