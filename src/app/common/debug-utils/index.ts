import { BugsnagUtil } from '@common';
import { clearAll, getAllKeys, load } from '@utils/storage';
import DevMenu from 'react-native-dev-menu';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
// import RNRestart from 'react-native-restart';

export class DebugUtils {
  public static configMenuLogStograge() {
    if (__DEV__) {
      DevMenu.addItem('Log Storage', async () => {
        const listKeys = await getAllKeys();
        if (listKeys != undefined) {
          const data = Object();
          listKeys.forEach((key: string) => {
            const value = load(key);
            data[key] = value;
          });
          this.logS(data);
        }
      });
      DevMenu.addItem('Clear Storage', async () => {
        clearAll();
        this.logS('Clear Storage =========> Done');
      });
    }
  }

  public static logS(params?: any) {
    if (__DEV__) {
      this.debug('=======================================>');
      this.debug(params);
      this.debug('=======================================>');
    }
  }

  public static debug(params?: any) {
    if (__DEV__) {
      console.log(params);
    }
  }

  public static configExceptionHandler() {
    if (!__DEV__) {
      setJSExceptionHandler((error, isFatal) => {
        if (isFatal) {
          BugsnagUtil.notify(error);
          // Alert.alert({
          //     title: 'Đã có lỗi xảy ra',
          //     message: `Lỗi: ${error?.name} ${error?.message}\n Bạn vui lòng khởi động lại ứng dụng.`,
          //     actions: [{
          //         text: 'Khởi động lại',
          //         onPress: () => {
          //             RNRestart.Restart();
          //         }
          //     }]
          // });
        }
      });
      setNativeExceptionHandler((exceptionString) => {
        BugsnagUtil.notify(exceptionString);
      });
    }
  }
}
