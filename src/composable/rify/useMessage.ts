import { Notify } from '@/utils/notify/notify.ts';
import { VNodeChild } from 'vue';
import { MessageRenderMessage } from 'naive-ui';
interface IMessage {
  type: 'success' | 'info' | 'warning' | 'error' | 'loading' | 'create';
  content: string;
  render?: MessageRenderMessage;
  duration?: number;
  closable?: boolean;
  keepAliveOnHover?: boolean;
  icon?: () => VNodeChild;
  showIcon?: boolean;
  onClose?: () => void;
  onLeave?: () => void;
  onAfterLeave?: () => void;
}

/**
 * 消息提示方法
 * @param param 消息参数
 */
const RifyMessage = (param: IMessage) => {
  // 解构参数
  const { type, content, ...options } = param;
  // 调用消息提示
  Notify.message[type](content, options);
};

export { RifyMessage, Notify as $notify };
