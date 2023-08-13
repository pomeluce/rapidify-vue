import { createApp } from 'vue';
import App from '@/App.vue';
import plugins from '@/plugins';
import directives from '@/directives';
import '@/styles/global.scss';
import 'font-awesome/css/font-awesome.min.css';

const bootstrap = (): void => {
  // 创建 vue 实例对象
  const app = createApp(App);
  // 挂载插件
  plugins(app);
  // 挂载指令
  directives(app);
  // 挂载到 app 中
  app.mount('#app');
};

bootstrap();
