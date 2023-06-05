import { App } from 'vue';
import { Edit, Validator } from 'vxe-table';
import 'vxe-table/lib/style.css';

const setup = (app: App) => {
  app.use(Edit).use(Validator);
};
export { setup };
