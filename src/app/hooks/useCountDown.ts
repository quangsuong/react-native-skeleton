import timerUtils from '@utils/timerUtils';
import { useEffect } from 'react';

export default function useCountDown() {
  useEffect(() => {
    timerUtils.canWork = true;
    timerUtils.countDown();

    return () => {
      timerUtils.removeCountDown();
      timerUtils.canWork = false;
    };
  }, []);
}
