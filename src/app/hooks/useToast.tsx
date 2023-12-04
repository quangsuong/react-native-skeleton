import { debounce, get, last } from 'lodash';
import { useToast as useToastState } from 'react-native-toast-notifications';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';

interface ToastType {
  message: string;
  option?: ToastOptions;
}

let queue: ToastType[] = [];
let showing = false;

export const useToast = () => {
  const { show: showToast, hide, hideAll, update } = useToastState();

  const showToastWithQueue = () => {
    if (queue.length > 0) {
      const option = get(last(queue), 'option', {});
      const message = get(last(queue), 'message', '');
      if (message) {
        showing = true;
        queue = [];
        showToast(message, {
          ...option,
          onClose: () => {
            showing = false;
            showToastWithQueue();
          },
        });
      }
    }
  };

  const show = debounce(
    (message: string, option?: ToastOptions) => {
      queue.push({ message, option });
      if (!showing) {
        showToastWithQueue();
      }
    },
    3000,
    { leading: true }
  );

  return {
    show,
    hide,
    hideAll,
    update,
  };
};
