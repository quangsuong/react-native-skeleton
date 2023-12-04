import { isAndroid } from '@common';
import { useToast } from '@customHooks/useToast';
import { isIOS } from '@notifee/react-native/dist/utils';
import { Clipboard } from 'react-native';
import DeviceInfo from 'react-native-device-info';
const useCopyTextToClipboard = () => {
  const { show } = useToast();
  const getOSVersionNumber = () => {
    const systemVersion = DeviceInfo.getSystemVersion();
    const arr = systemVersion.split('.');
    return Number(arr[0] ?? -1);
  };
  const copyTextToClipboard = (text?: string, message?: string) => {
    Clipboard.setString(text ?? '');
    const osVersion = getOSVersionNumber();
    if (isIOS && message) {
      show(message);
      return;
    }
    if (isAndroid && message && osVersion < 12) {
      show(message);
    }
  };
  return {
    getOSVersionNumber,
    copyTextToClipboard,
  };
};
export default useCopyTextToClipboard;
