import { clearSession } from '@common';
import { showAlert } from '@components/alert';
import { translate } from '@utils/i18n/translate';
import BackgroundTimer from 'react-native-background-timer';

const timeOutApp = 3e5; // 5 min

class CountDown {
  timeoutId = null;
  canWork = false;

  removeCountDown = () => {
    BackgroundTimer.clearTimeout(this.timeoutId);
    this.timeoutId = null;
  };

  resetCountDown = () => {
    if (!this.canWork) return;
    this.removeCountDown();
    BackgroundTimer.setTimeout(() => {
      this.countDown();
    }, 10);
  };

  countDown = () => {
    if (this.timeoutId) return;
    this.timeoutId = BackgroundTimer.setTimeout(() => {
      showAlert({
        title: translate('alert:session_expire'),
        content: translate('error:GW-414'),
        disableTouchOutSide: true,
        actions: [
          {
            title: translate('alert:back_to_login'),
            onPress: clearSession,
          },
        ],
      });
    }, timeOutApp);
  };
}

const timerUtils = new CountDown();
export default timerUtils;
