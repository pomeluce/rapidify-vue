import { CheckOne, ClickTap, CloseOne, DoubleRight, Redo, RefreshOne } from '@icon-park/vue-next';
import { PropType } from 'vue';
import './styles/slider-validator.scss';

export interface SliderOptions {
  startX: number;
  startY: number;
  length: number;
}

const props = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 250,
  },
  height: {
    type: Number,
    default: 150,
  },
  options: {
    type: Object as PropType<SliderOptions>,
    default: () => generateOptions(),
  },
  tips: {
    type: String,
    default: '拖动滑块以验证身份',
  },
};

/* 坐标初始化函数, 在未接受到 options 参数的时候调用 */
const generateOptions = (): SliderOptions => {
  const startX = Math.floor(Math.random() * 100) + 50;
  const startY = Math.floor(Math.random() * 50) + 50;
  const length = 36;
  return { startX, startY, length };
};

export default defineComponent({
  name: 'rify-slider-validator',
  props: { ...props },
  emits: {
    'update:modelValue': (_: boolean) => true,
    handleRest: () => true,
  },
  setup(props, { emit }) {
    const { width, height, options, tips } = props;

    // 拼图 canvas
    const sliderCvs = ref<HTMLCanvasElement>();
    // 背景 canvas
    const bgCvs = ref<HTMLCanvasElement>();
    // 背景 canvas context
    const ctx = ref<CanvasRenderingContext2D>();
    // 拼图 canvas context
    const puzzle = ref<CanvasRenderingContext2D>();
    // 拼图半径
    const radius = ref<number>(options.length / 5);
    // 拼图图片数据
    const sliderImgDate = ref<ImageData>();
    // 滑块
    const sliderBtn = ref<HTMLElement>();
    // 滑块拖动背景
    const sliderBg = ref<HTMLElement>();
    // 是否拖拽
    const isDrag = ref<boolean>(false);
    // 滑块位置
    const maxMoveX = ref<number>(0);
    // 初始距离屏幕左边距离
    const beginClientX = ref<number>(0);
    // 判定是否滑动结束
    const isFinish = ref<boolean>(false);
    // 是否验证成功
    const isFail = ref<boolean>(true);
    // 验证结果
    const validedText = ref<string>('');
    // 开始毫秒数
    const startTime = ref<number>(0);
    // 结束毫秒数
    const endTime = ref<number>(0);
    // 是否显示验证面板
    const isShow = ref<boolean>(false);
    // 触发按钮文字
    const triggerText = ref<string>('点击按钮开始验证');
    // 触发按钮样式
    const triggerStyle = ref<string>('');
    // 触发按钮图标
    const triggerIcon = ref<Function>(() => {
      return <ClickTap class={'animate-bounce text-blue-500'} />;
    });

    /* 拼图背景初始化*/
    const cvsInit = () => {
      sliderCvs.value = document.getElementById('rify-slider') as HTMLCanvasElement;
      bgCvs.value = document.getElementById('rify-slider-validator-bg') as HTMLCanvasElement;
      ctx.value = bgCvs.value.getContext('2d')!;
      puzzle.value = sliderCvs.value.getContext('2d')!;
      drawPath(ctx.value, options);
      drawPath(puzzle.value, options, true);
      drawImage(sliderCvs.value, ctx.value, puzzle.value);
    };

    /**
     * 绘制路径
     * @param ctx canvas context
     * @param options 绘制路径的参数
     * @param isClip 是否裁剪
     */
    const drawPath = (ctx: CanvasRenderingContext2D, options: SliderOptions, isClip: boolean = false) => {
      const { startX, startY, length } = options;
      const radius = length / 5;
      const offset = length / 6.4;
      // 开始绘制
      ctx.beginPath();
      // 绘制起点
      ctx.moveTo(startX, startY);
      ctx.arc(startX + length / 2, startY - offset, radius, 0.72 * Math.PI, 2.26 * Math.PI);
      ctx.lineTo(startX + length, startY);
      ctx.arc(startX + length + offset, startY + length / 2, radius, 1.2 * Math.PI, 2.78 * Math.PI);
      ctx.lineTo(startX + length, startY + length);
      ctx.lineTo(startX, startY + length);
      ctx.arc(startX + offset, startY + length / 2, radius, 2.78 * Math.PI, 1.2 * Math.PI, true);
      // 绘制结束
      ctx.closePath();
      // 设置路径宽度
      ctx.lineWidth = 1;
      // 填充颜色
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      // 设置路径颜色
      ctx.strokeStyle = '#fff';
      // 描边
      ctx.stroke();
      // 叠在原图上方
      ctx.globalCompositeOperation = 'destination-over';
      isClip ? ctx.clip() : ctx.fill();
    };

    /**
     * 绘制图片
     * @param sliderCvs 滑块 canvas
     * @param ctx 滑块 canvas context
     * @param puzzle 拼图 canvas context
     */
    const drawImage = (
      sliderCvs: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      puzzle: CanvasRenderingContext2D,
    ) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = 'Anonymous';
      img.src =
        'https://images.unsplash.com/photo-1691437195457-5ccbf15277bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60';
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        puzzle.drawImage(img, 0, 0, width, height);
        const { startX, startY, length } = options;
        const len = length + radius.value * 2 + 2;
        sliderImgDate.value = puzzle.getImageData(startX - 1, startY - radius.value * 2 - 1, len, len);
        sliderCvs.width = len;
        puzzle.putImageData(sliderImgDate.value, 0, startY - radius.value * 2 - 1);
      };
    };

    /**
     * 拼图移动
     * @param moveX 移动距离
     */
    const setCvsXY = (moveX: number = 0) => {
      const { startX, startY, length } = options;
      sliderCvs.value!.width = length + radius.value * 2 + 2 + moveX;
      puzzle.value!.putImageData(sliderImgDate.value!, moveX, startY - radius.value * 2 - 1);
      isFail.value = !(Math.abs(moveX - startX) < 5);
    };

    /* 滑块初始化 */
    const btnInit = () => {
      const outer = document.querySelector('.rify-slider-btn-outer')! as HTMLElement;
      sliderBtn.value = document.querySelector('.rify-slider-btn')! as HTMLElement;
      sliderBg.value = document.querySelector('.rify-slider-bg')! as HTMLElement;
      // 获取最大滑动距离
      maxMoveX.value = outer.clientWidth - Math.max(sliderBtn.value.clientWidth, options.length + radius.value * 2 + 2);
      // 滑块初始左边距
      beginClientX.value = outer.getBoundingClientRect().left;
      // 添加事件监听
      outer.addEventListener('mousedown', handleMoveDown);
      outer.addEventListener('touchstart', handleMoveDown);
      document.addEventListener('mousemove', handleMoveDrag);
      document.addEventListener('touchmove', handleMoveDrag);
      document.addEventListener('mouseup', handleMoveUp);
      document.addEventListener('touchend', handleMoveUp);
    };

    /**
     * 点击/触摸滑块
     * @param e 事件对象
     */
    const handleMoveDown = (e: MouseEvent | TouchEvent) => {
      if (isFinish.value) return;
      e.preventDefault();
      isDrag.value = true;
      startTime.value = new Date().getTime();
    };

    /**
     * 拖拽滑块
     * @param e 事件对象
     */
    const handleMoveDrag = (e: MouseEvent | TouchEvent) => {
      // 判断是否可以拖拽
      if (!isDrag.value || isFinish.value) return;
      // 阻止默认事件
      e.preventDefault();
      // 获取鼠标/手指位置
      const eventX = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - sliderBtn.value!.clientWidth / 2;
      // 计算滑块移动距离
      let moveX = eventX - beginClientX.value;
      // 限制滑块移动范围
      eventX > beginClientX.value + maxMoveX.value && (moveX = maxMoveX.value);
      eventX < beginClientX.value && (moveX = 0);
      if (moveX >= 0) {
        sliderBtn.value!.style.left = `${moveX}px`;
        sliderBg.value!.style.width = `${moveX}px`;
        setCvsXY(moveX);
      }
    };

    /**
     * 鼠标松开/触摸结束, 滑块移动完毕
     * @param e 事件对象
     */
    const handleMoveUp = (e: MouseEvent | TouchEvent) => {
      if (!isDrag.value || isFinish.value) return;
      e.preventDefault();
      isDrag.value = false;
      isFinish.value = true;
      endTime.value = new Date().getTime();
      // 判断是否验证成功
      validedText.value = isFail.value ? '验证失败' : '验证成功';
      emit('update:modelValue', !isFail.value);
      // 关闭验证面板
      setTimeout(() => {
        isShow.value = false;
        // 触发按钮样式
        triggerStyle.value = isFail.value ? 'rify-slider-trigger_fail' : 'rify-slider-trigger_success';
        // 设置触发文本
        triggerText.value = isFail.value ? '点击重试' : '验证成功';
        // 修改触发按钮图标
        triggerIcon.value = isFail.value ? () => <RefreshOne /> : () => <CheckOne />;
        reset();
      }, 1000);
    };

    /*  重置事件 */
    const reset = () => {
      emit('handleRest');
      setCvsXY();
      sliderBtn.value!.style.left = '0';
      sliderBg.value!.style.width = '0';
      validedText.value = '';
      isFinish.value = false;
    };

    /**
     * 点击外部关闭
     * @param e 事件对象
     */
    const handleClickOutside = (e: Event) => {
      const mainEl = document.querySelector('.rify-slider-validator')! as HTMLElement;
      if (!mainEl.contains(e.target as HTMLElement)) {
        isShow.value = false;
        reset();
      }
    };

    const handleTragger = () => {
      // 滑块初始左边距
      beginClientX.value = (
        document.querySelector('.rify-slider-btn-outer')! as HTMLElement
      ).getBoundingClientRect().left;
      isShow.value = true;
      document.addEventListener('click', handleClickOutside);
    };

    onMounted(() => {
      cvsInit();
      btnInit();
    });

    onUnmounted(() => {
      // 移除事件监听
      document.removeEventListener('mousemove', handleMoveDrag);
      document.removeEventListener('touchmove', handleMoveDrag);
      document.removeEventListener('mouseup', handleMoveUp);
      document.removeEventListener('touchend', handleMoveUp);
      document.removeEventListener('click', handleClickOutside);
    });

    return () => (
      <div class={'rify-slider-validator'}>
        <section class={`rify-slider-trigger ${triggerStyle.value}`} onClick={handleTragger}>
          {triggerIcon.value()}
          <span>{triggerText.value}</span>
        </section>
        <main class={`rify-slider-content ${isShow.value ? 'visible' : 'invisible'}`} style={{ width: `${width}px` }}>
          <div class={'rify-slider-canvas'}>
            <canvas id={'rify-slider-validator-bg'} width={width} height={height} />
            <canvas id={'rify-slider'} width={width} height={height} />
            {validedText.value ? (
              <span class={`rify-slider-result ${isFail.value ? 'text-red-500' : 'text-green-700'}`}>
                {validedText.value}, 本次耗时{(endTime.value - startTime.value) / 1000}s
              </span>
            ) : null}
            <span class={'rify-slider-refresh'} onClick={reset}>
              <Redo size={20} fill={'#fff'} />
            </span>
          </div>
          <div class={'rify-slider-btn-outer'}>
            <span class={`rify-slider-tips ${isFinish.value || !isShow.value ? 'invisible' : 'visible'}`}>{tips}</span>
            <span
              class={`rify-slider-bg ${!isFinish.value ? 'bg-blue-500' : isFail.value ? 'bg-red-600' : 'bg-[#76c61d]'}`}
            ></span>
            <span class={'rify-slider-btn'}>
              {!isFinish.value ? (
                <DoubleRight />
              ) : isFail.value ? (
                <CloseOne fill={'#f03e3e'} />
              ) : (
                <CheckOne fill={'#40c057'} />
              )}
            </span>
          </div>
        </main>
      </div>
    );
  },
});
