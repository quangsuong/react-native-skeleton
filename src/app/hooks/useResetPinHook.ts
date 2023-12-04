import { logout } from '@common';
import { showAlert } from '@components/alert';
import { goBack, navigate, replace } from '@navigation/navigation-service';
import { UN_AUTHORIZE_SCREEN } from '@navigation/screen-types';
import sotpUtils from '@utils/sotp-utils';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SubmitProps {
  pin?: string;
}

interface Props {}

const useResetPinHook = (props: Props) => {
  const pinRef = useRef();
  const [t] = useTranslation();
  const [pinCode, setPinCode] = useState<string>();
  const [pinError, setPinError] = useState<string>();
  let pinAttempts = 0;

  const onPinFillDone = async ({ pin }: SubmitProps) => {
    const sotpValid = await sotpUtils.checkPin(Number(pin));
    if (sotpValid) {
      pinAttempts = 0;
      setPinError('');
      replace(UN_AUTHORIZE_SCREEN.SMART_OTP_NEW_PIN);
    } else {
      pinAttempts++;
      if (pinAttempts < 4) {
        setPinError(t('text:sotp_pin_text_error'));
      } else {
        onLockSmartOtpDialog();
        sotpUtils.LockSOTP();
      }
    }
  };

  const onActiveSmartOtp = useCallback(() => {
    navigate(UN_AUTHORIZE_SCREEN.LOGIN);
  }, []);

  const onLockSmartOtpDialog = () => {
    showAlert({
      title: t('alert:notify'),
      content: t('alert:sotp_pin_locked'),
      type: 'alert',
      actions: [
        {
          title: t('alert:close'),
          type: 'primary',
          onPress: logout,
        },
      ],
    });
  };

  const onForgotPin = useCallback(() => {
    showAlert({
      title: t('alert:forgot_pin_smart_otp'),
      content: t('alert:forgot_pin_smart_otp_des'),
      type: 'confirm',
      actions: [
        {
          title: t('alert:close'),
          type: 'secondary',
        },
        {
          title: t('alert:continue'),
          type: 'primary',
          onPress: onActiveSmartOtp,
        },
      ],
    });
  }, []);

  const onCancel = () => {
    goBack();
  };

  return {
    pinRef,
    onCancel,
    pinCode,
    setPinCode,
    onPinFillDone,
    pinError,
    onForgotPin,
  };
};

export default useResetPinHook;
