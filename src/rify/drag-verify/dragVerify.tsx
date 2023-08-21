import { CheckOne, CloseOne, DoubleRight, Redo } from '@icon-park/vue-next';
import { RifyDragVerifyOptions } from './interface';
import { drawPath, drawImage } from './utils';
import './styles/dragVerify.scss';
import { PropType } from 'vue';

const props = {
  width: {
    type: Number,
    default: 250,
  },
  height: {
    type: Number,
    default: 150,
  },
  tips: {
    type: String,
    default: '请滑动滑块以验证身份',
  },
  options: Object as PropType<RifyDragVerifyOptions | undefined>,
};

export default defineComponent({
  name: 'rify-drag-verify',
  props: { ...props },
  emits: ['handleRest', 'handleVerify'],
  setup(props, { emit }) {
    /* DOM 元素 */
    let dragEl = {} as HTMLCanvasElement;
    let dragBgEl = {} as HTMLCanvasElement;
    let sliderEl = {} as HTMLElement;
    let sliderBtnEl = {} as HTMLElement;
    let sliderBgEl = {} as HTMLElement;

    /* 验证参数 */
    let options: RifyDragVerifyOptions = reactive({} as RifyDragVerifyOptions);

    // 滑块的最大移动距离
    const maxMoveX = ref<number>(0);
    // 滑块初始左边距
    const beginClientX = ref<number>(0);
    // 是否可以滑动滑块
    const isMove = ref<boolean>(false);
    // 滑块验证结果
    const isVerify = ref<boolean>(false);
    // 验证是否结束
    const isEnd = ref<boolean>(false);
    // 验证开始时间
    const startTime = ref<number>(0);
    // 验证结束时间
    const endTime = ref<number>(0);
    // 验证结束提示文本
    const verfiyText = ref<string>('');

    const cvsInit = () => {
      // 获取画布
      dragBgEl = document.getElementById('rify-drag-verify-canvas_bg') as HTMLCanvasElement;
      dragEl = document.getElementById('rify-drag-verify-canvas_puzzle') as HTMLCanvasElement;
      const dragBgEl2D = dragBgEl.getContext('2d') as CanvasRenderingContext2D;
      const dragEl2D = dragEl.getContext('2d') as CanvasRenderingContext2D;

      // 清除画布
      dragBgEl2D.clearRect(0, 0, dragBgEl.width, dragBgEl.height);
      dragEl2D.clearRect(0, 0, dragEl.width, dragEl.height);

      // 移除拼图左边距
      dragEl.style.left = '0px';

      drawImage(dragEl, dragBgEl, options);
      drawPath(dragBgEl2D, options);
      drawPath(dragEl2D, options, true);
    };

    const sliderInit = () => {
      const { length, radius } = options;
      // 获取滑块
      sliderEl = document.querySelector('.rify-drag-verify-slider') as HTMLElement;
      sliderBtnEl = document.querySelector('.rify-drag-verify-slider_btn') as HTMLElement;
      sliderBgEl = document.querySelector('.rify-drag-verify-slider_bg') as HTMLElement;

      // 获取最大滑动距离
      maxMoveX.value = sliderEl.clientWidth - Math.max(sliderBtnEl.clientWidth, length + radius * 2 + 2);
      // 滑块初始左边距
      beginClientX.value = sliderEl.getBoundingClientRect().left;

      // 添加事件监听
      sliderEl.addEventListener('mousedown', handleMoveDown);
      document.addEventListener('mousemove', handleMoveDrag);
      document.addEventListener('mouseup', handleMoveUp);
      sliderEl.addEventListener('touchstart', handleMoveDown);
      document.addEventListener('touchmove', handleMoveDrag);
      document.addEventListener('touchend', handleMoveUp);
    };

    /**
     * 点击/触摸滑块
     * @param e 事件对象
     */
    const handleMoveDown = (e: MouseEvent | TouchEvent) => {
      if (isMove.value || isEnd.value) return;
      e.preventDefault();
      isMove.value = true;
      startTime.value = new Date().getTime();
    };

    /**
     * 拖拽滑块
     * @param e 事件对象
     */
    const handleMoveDrag = (e: MouseEvent | TouchEvent) => {
      // 判断是否可以拖拽
      if (!isMove.value) return;
      // 阻止默认事件
      e.preventDefault();
      // 获取鼠标/手指位置
      const eventX = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - sliderBtnEl.clientWidth / 2;
      // 计算滑块移动距离
      let moveX = eventX - beginClientX.value;
      // 限制滑块移动范围
      eventX > beginClientX.value + maxMoveX.value && (moveX = maxMoveX.value);
      eventX < beginClientX.value && (moveX = 0);
      // 滑块移动
      sliderBtnEl.style.left = `${moveX}px`;
      // 设置背景宽度
      sliderBgEl.style.width = `${moveX}px`;
      // 拼图移动
      dragEl.style.left = `${moveX}px`;
      // 判定结果
      isVerify.value = Math.abs(moveX - options.startX) < 5;
    };

    /**
     * 鼠标松开/触摸结束, 滑块移动完毕
     * @param e 事件对象
     */
    const handleMoveUp = (e: MouseEvent | TouchEvent) => {
      if (!isMove.value || isEnd.value) return;
      e.preventDefault();
      endTime.value = new Date().getTime();
      isMove.value = false;
      isEnd.value = true;
      // 设置提示文本
      verfiyText.value = isVerify.value ? '验证成功' : '验证失败';
      // 执行自定义事件
      emit('handleVerify', isVerify.value);
    };

    const varReset = () => {
      isMove.value = false;
      isVerify.value = false;
      isEnd.value = false;
      startTime.value = 0;
      endTime.value = 0;
      verfiyText.value = '';
    };

    /* 重置方法 */
    const dragVerifyReset = () => {
      // 执行自定义事件
      emit('handleRest');
      // 清除按钮左边距
      sliderBtnEl.style.left = '0px';
      // 清除按钮背景宽度
      sliderBgEl.style.width = '0px';
      cvsInit();
      varReset();
    };

    const init = (opt: RifyDragVerifyOptions | undefined) => {
      if (!!opt) {
        options = Object.assign(options, opt);
        cvsInit();
        sliderInit();
      }
    };

    watch(
      () => props.options,
      val => init(val),
    );

    onMounted(() => {
      init(props.options);
    });

    onUnmounted(() => {
      sliderEl.removeEventListener('mousedown', handleMoveDown);
      document.removeEventListener('mousemove', handleMoveDrag);
      document.removeEventListener('mouseup', handleMoveUp);
      sliderEl.removeEventListener('touchstart', handleMoveDown);
      document.removeEventListener('touchmove', handleMoveDrag);
      document.removeEventListener('touchend', handleMoveUp);
    });

    return () => (
      <main class={'rify-drag-verify'} style={{ width: `${props.width}px` }}>
        <section class={'rify-drag-verify-canvas'}>
          <canvas id={'rify-drag-verify-canvas_bg'} width={props.width} height={props.height} />
          <canvas id={'rify-drag-verify-canvas_puzzle'} width={props.width} height={props.height} />
          {verfiyText.value ? (
            <span class={`rify-drag-verify-text ${isVerify.value ? 'text-green-700' : 'text-red-500'}`}>
              {verfiyText.value}, 本次耗时{(endTime.value - startTime.value) / 1000}s
            </span>
          ) : null}
          <span class={'rify-drag-verify-refresh'} onClick={dragVerifyReset}>
            <Redo size={20} fill={'#fff'} />
          </span>
          {!!props.options ? null : (
            <div class={'rify-drag-verify-load'}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </section>
        <section class={'rify-drag-verify-slider'}>
          <span class={`rify-drag-verify-slider_tips ${isEnd.value ? 'invisible' : 'visible'}`}>{props.tips}</span>
          <span
            class={`rify-drag-verify-slider_bg ${
              isEnd.value ? (isVerify.value ? 'bg-green-600' : 'bg-red-500') : 'bg-blue-500'
            }`}
          ></span>
          <span class={'rify-drag-verify-slider_btn'}>
            {isEnd.value ? (
              isVerify.value ? (
                <CheckOne fill={'#40c057'} />
              ) : (
                <CloseOne fill={'#fa5252'} />
              )
            ) : (
              <DoubleRight />
            )}
          </span>
        </section>
      </main>
    );
  },
});
