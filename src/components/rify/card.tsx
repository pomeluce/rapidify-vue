export default defineComponent({
  name: 'rify-card',
  setup(_, { slots }) {
    return () => (
      <section class={Object.keys(slots).length ? 'bg-white overflow-hidden border shadow-sm rounded-xl' : ''}>
        {slots.title ? <h1 class={'p-5 py-3 opacity-90 text-lg font-normal border-b'}>{slots.title()}</h1> : null}
        {slots.default ? <div class={'p-5 min-h-[100px]'}>{slots.default()}</div> : null}
        {slots.foot ? <footer class={'px-5 py-3 bg-gray-50 border-t'}>{slots.foot && slots.foot()}</footer> : null}
      </section>
    );
  },
});
