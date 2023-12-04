import { showAlert } from '@components/alert';
import { goBack } from '@navigation/navigation-service';
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BackgroundTimer from 'react-native-background-timer';
import { COUNT_TIME } from '../common/constant';

let intervalId: number;

export default function useTimerTransfer() {
  const [time, setTime] = useState<number>(COUNT_TIME);
  const { t } = useTranslation();

  const isFocussed = useIsFocused();

  useEffect(() => {
    if (!isFocussed) {
      BackgroundTimer.clearInterval(intervalId);
    }
  }, [isFocussed]);

  useEffect(() => {
    // Start a timer that runs continuous after X milliseconds
    intervalId = BackgroundTimer.setInterval(() => {
      setTime((time) => {
        const newTime = time > 0 ? time - 1 : time;
        if (newTime === 0) {
          clearInterval(intervalId);
        }
        return newTime;
      });
    }, 1000);

    // Cancel the timer when you are done with it
    return () => {
      BackgroundTimer.clearInterval(intervalId);
    };
  }, [time]);

  const actionWhenTimeOut = useCallback(() => {
    // const numOfBackScreen = sotpActived ? 2 : 1;
    // pop(numOfBackScreen)
    goBack();
  }, []);

  useEffect(() => {
    if (time < 1) {
      showAlert({
        title: t('alert:transaction_time_over_title'),
        content: t('alert:transaction_time_over_content'),
        type: 'confirm',
        actions: [
          {
            title: t('alert:try_again'),
            type: 'primary',
            onPress: actionWhenTimeOut,
          },
        ],
      });
    }
  }, [time]);

  const minutes = useMemo(
    () =>
      Math.floor(time / 60)
        .toString()
        .lessThanTen(),
    [time]
  );
  const second = useMemo(() => (time % 60).toString().lessThanTen(), [time]);

  return {
    time,
    minutes,
    second,
  };
}
