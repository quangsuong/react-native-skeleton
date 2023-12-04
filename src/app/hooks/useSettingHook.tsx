import { DebugUtils } from '@common';
import useBiometrics from '@customHooks/biometricsContext';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useCallback, useEffect, useState } from 'react';

interface Props {}
const useSettingHook = (props: Props) => {
  const [isSupportBiometric, setIsSupportBiometric] = useState<boolean>(false);
  const [faceTouchID, setFaceTouchID] = useState<boolean>(false);
  const biometrics = useBiometrics();

  useEffect(() => {
    setIsSupportBiometric(biometrics.isBiometricsSupported);
  }, []);

  const onSwitchFaceTouchID = useCallback((value) => {
    biometrics
      .promptBiometrics(
        '',
        () => setFaceTouchID(!value),
        (type) => DebugUtils.logS(type)
      )
      .then(() => {});
  }, []);

  const onResetSOTPPin = useCallback(() => {
    navigate(APP_SCREEN.SMART_OTP_RESET_PIN);
  }, []);

  const onCancelSOTP = useCallback(() => {
    navigate(APP_SCREEN.SMART_OTP_CANCEL);
  }, []);

  return {
    isSupportBiometric,
    faceTouchID,
    onSwitchFaceTouchID,
    onResetSOTPPin,
    onCancelSOTP,
  };
};

export default useSettingHook;
