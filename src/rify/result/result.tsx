import { SlotsType } from 'vue';

const props = {
  title: {
    type: String,
    default: '结果页',
  },
  message: String,
};

export default defineComponent({
  name: 'rify-result',
  props: { ...props },
  slots: Object as SlotsType<{
    default?: () => any;
    icon?: () => any;
    opreate?: () => any;
  }>,
  setup({ title, message }, { slots }) {
    return () => (
      <main class={'px-5 py-7 bg-white flex flex-col justify-center items-center gap-5'}>
        {slots.icon?.()}
        <h1 class={'font-bold text-3xl opacity-90'}>{title}</h1>
        <span class={'text-sm'}>{message}</span>
        {slots.default ? (
          <section class={'min-w-[50%] md:w-2/3 m-auto px-10 py-5 rounded bg-gray-200'}>{slots.default()}</section>
        ) : null}
        {slots.opreate ? <section>{slots.opreate()}</section> : null}
      </main>
    );
  },
});
