import { Notify } from '@/utils/notify/notify.ts';

export default defineComponent({
  name: 'rify-notify',
  setup() {
    Notify.message = useMessage();
    Notify.dialog = useDialog();
    return () => <div></div>;
  },
});
