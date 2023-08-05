import { RouterLink } from 'vue-router';

interface IBreadcrumb {
  label: string;
  to?: string;
}
export default defineComponent({
  name: 'rify-breadcrumb',
  props: {
    options: {
      type: Array<IBreadcrumb>,
      default: [],
    },
  },
  setup({ options }) {
    return () => (
      <div class="flex items-center">
        {options.map((item, index) => (
          <span class={'font-medium'} key={index}>
            {index ? <i class={'font-semibold text-slate-700 px-2 cursor-pointer'}>/</i> : null}
            <RouterLink to={{ name: item.to }}>{item.label}</RouterLink>
          </span>
        ))}
      </div>
    );
  },
});
