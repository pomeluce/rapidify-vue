import { App } from 'vue';
import loading from './loading';

const modules = [loading];
export default (app: App) => {
  modules.map(module => module(app));
};
