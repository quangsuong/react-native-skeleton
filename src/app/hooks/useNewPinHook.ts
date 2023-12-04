import { DebugUtils } from '@common';
import useBiometrics from '@customHooks/biometricsContext';
import { useToast } from '@customHooks/useToast';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN, UN_AUTHORIZE_SCREEN } from '@navigation/screen-types';
import sotpUtils from '@utils/sotp-utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  isActiveSotpFlow?: boolean;
}

const useNewPinHook = (props: Props) => {
  const useBiometric = useBiometrics();
  const toast = useToast();
  const [t] = useTranslation();

  const onSuccess = (value: string) => {
    DebugUtils.logS(['NewPin', value]);
    sotpUtils.savePin(Number(value));
    props.isActiveSotpFlow ? handleActiveSotpFlow() : navigate(UN_AUTHORIZE_SCREEN.LOGIN);
  };
  const handleActiveSotpFlow = async () => {
    const isBioMetricExist = await useBiometric.checkBioMetricExist();
    isBioMetricExist ? navigate(APP_SCREEN.SETUP_BIOMETRIC) : navigate(UN_AUTHORIZE_SCREEN.LOGIN);
    toast.show(t('text:set_sotp_success_title'));
  };

  const onCancel = useCallback(() => {
    goBack();
  }, []);

  return {
    onCancel,
    onSuccess,
  };
};

export default useNewPinHook;
