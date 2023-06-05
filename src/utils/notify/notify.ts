import type { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider';
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider';

interface INotify {
  message: MessageApiInjection;
  dialog: DialogApiInjection;
}
const Notify: INotify = {
  message: {} as MessageApiInjection,
  dialog: {} as DialogApiInjection,
};

export { Notify };
