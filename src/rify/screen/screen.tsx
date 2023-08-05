import { FullScreen, OffScreen } from '@icon-park/vue-next';

const isFull = ref<boolean>(false);

const isScreen = () => {
  isFull.value ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  isFull.value = !isFull.value;
};

document.addEventListener('fullscreenchange', () => {
  isFull.value = !!document.fullscreenElement;
});
export default defineComponent({
  name: 'rify-screen',
  setup() {
    return () => (
      <div class={'2xl:flex items-center cursor-pointer text-gray-700 hover:text-gray-500 hidden'} onClick={isScreen}>
        {!isFull.value ? <FullScreen theme={'outline'} size={20} /> : <OffScreen theme={'outline'} size={20} />}
      </div>
    );
  },
});
