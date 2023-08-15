import { Component, SlotsType } from 'vue';
import { Attention, CheckOne, CloseOne, Help, Info } from '@icon-park/vue-next';
import './styles/alert.scss';

const props = {
  type: {
    type: String as () => 'default' | 'success' | 'warning' | 'error' | 'info',
    default: 'default',
  },
  title: {
    type: String,
    default: '',
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
};

const icons: Record<string, Component> = {
  default: Help,
  success: CheckOne,
  error: CloseOne,
  warning: Attention,
  info: Info,
};

const iconMount = (type: string, size: number) => {
  const icon = icons[type];
  return h(icon, { theme: 'filled', size });
};

export default defineComponent({
  name: 'rify-alert',
  props: { ...props },
  slots: Object as SlotsType<{
    default?: () => any;
    icon?: () => any;
    closeable?: () => any;
  }>,
  setup(props, { slots }) {
    const { showIcon, closeable, center } = props;
    const isShow = ref<boolean>(true);
    const iconSize = ref<number>(16);

    const updateIconSize = () => {
      const elHeight = document.querySelector('.rify-alert')!.clientHeight;
      iconSize.value = Math.min(elHeight - 20, 24);
    };

    onMounted(() => updateIconSize());

    window.addEventListener('resize', () => updateIconSize());

    onUnmounted(() => window.removeEventListener('resize', () => updateIconSize()));

    return () => (
      <>
        {isShow.value ? (
          <div class={`rify-alert rify-alert_${props.type}`}>
            <div class={`grow flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
              {showIcon ? (slots.icon ? slots.icon() : iconMount(props.type, iconSize.value)) : null}
              <section class={'flex flex-col gap-2'}>
                <span class={'font-semibold'}>{props.title}</span>
                {slots.default?.()}
              </section>
            </div>
            <span onClick={() => (isShow.value = false)}>
              {closeable ? slots.closeable ? slots.closeable() : <CloseOne theme="outline" size={16} /> : null}
            </span>
          </div>
        ) : null}
      </>
    );
  },
});
