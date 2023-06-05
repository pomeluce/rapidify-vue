import { PropType } from 'vue';
import { ILoadOptions } from '@/directives/loading';
import { LoadingFour } from '@icon-park/vue-next';

export default defineComponent({
  name: 'rify-loading',
  props: {
    options: Object as PropType<ILoadOptions>,
  },
  setup({ options }) {
    return () => (
      <div
        class={
          options?.isShow
            ? 'hidden'
            : 'rify-loading w-full h-full fixed flex flex-col justify-center items-center gap-10 opacity-70 bg-gray-50 left-0 top-0 z-50'
        }
        style={{ backgroundColor: options?.bgColor }}
      >
        <LoadingFour
          class={'animate-spin duration-300'}
          theme="filled"
          strokeWidth={options?.width}
          size={options?.size}
          fill={options?.color}
        />
        <span>{options?.message}</span>
      </div>
    );
  },
});
