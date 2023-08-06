import { SlotsType } from 'vue/dist/vue.js';
import './styles/error.scss';

const props = {
  bgColor: {
    type: String,
    default: '#606e75',
  },
  color: {
    type: String,
    default: '#fff',
  },
  httpCode: Number,
  message: String,
};

export default defineComponent({
  name: 'rify-error',
  props: { ...props },
  slots: Object as SlotsType<{
    button?: () => any;
  }>,
  setup({ color, bgColor, httpCode, message }, { slots }) {
    // 导入颜色代码校验和生成函数
    const { lightenColor, isValidColorCode } = useUtils();

    // 校验颜色代码
    const setPropertyIfValid = (el: HTMLElement, property: string, value: string, errorMessage: string) => {
      if (isValidColorCode(value)) {
        el.style.setProperty(property, value);
      } else {
        throw new Error(errorMessage);
      }
    };

    /* 传递 bgColor, 和 color */
    onMounted(() => {
      const rifyErrorEl = document.querySelector('.rify-error')! as HTMLElement;

      setPropertyIfValid(rifyErrorEl, '--rify-error-main-bgColor', bgColor, 'bgColor 参数为非有效的颜色代码');
      setPropertyIfValid(
        rifyErrorEl,
        '--rify-error-bgColor',
        lightenColor(bgColor, 30),
        'bgColor 参数为非有效的颜色代码',
      );
      setPropertyIfValid(rifyErrorEl, '--rify-error-ghost-color', color, 'color 参数为非有效的颜色代码');
    });

    return () => (
      <main class={'rify-error'}>
        <div class={'rify-error-main'}>
          <div class={'rify-error-ghost'}>
            <div class={'rify-error-symbol'}></div>
            <div class={'rify-error-symbol'}></div>
            <div class={'rify-error-symbol'}></div>
            <div class={'rify-error-symbol'}></div>
            <div class={'rify-error-symbol'}></div>
            <div class={'rify-error-symbol'}></div>
            <section class={'rify-error-ghost_eyes'}>
              <span class={'rify-error-ghost_eyes-left'}></span>
              <span class={'rify-error-ghost_eyes-right'}></span>
            </section>
            <section class={'rify-error-ghost_bottom'}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </section>
          </div>
          <section class={'rify-error-ghost_shadow'}></section>
          <section class={'rify-error-message'}>
            <span> {httpCode || 'ERROR'} </span>
            <span> {message || 'This is error page'} </span>
          </section>
          {slots.button ? slots.button() : null}
        </div>
      </main>
    );
  },
});
