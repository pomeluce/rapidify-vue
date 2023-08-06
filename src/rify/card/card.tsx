import { SlotsType } from 'vue';

const props = {
  isHoverShadow: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: '#ffffff',
  },
};

export default defineComponent({
  name: 'rify-card',
  props: { ...props },
  slots: Object as SlotsType<{
    default?: () => any;
    title?: () => any;
    foot?: () => any;
  }>,
  setup({ isHoverShadow, bgColor }, { slots }) {
    return () => (
      <section
        style={{ backgroundColor: bgColor }}
        class={
          Object.keys(slots).length ? `border shadow-sm rounded-xl ${isHoverShadow ? 'hover:drop-shadow-xl' : ''}` : ''
        }
      >
        {slots.title ? <h1 class={'p-5 py-3 opacity-90 text-lg font-normal border-b'}>{slots.title()}</h1> : null}
        {slots.default ? <div class={'p-5 min-h-[100px]'}>{slots.default()}</div> : null}
        {slots.foot ? <footer class={'px-5 py-3 bg-gray-50 border-t'}>{slots.foot && slots.foot()}</footer> : null}
      </section>
    );
  },
});
