import { logout } from '@common';
import { showAlert } from '@components/alert';
import { goBack, replace } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import sotpUtils from '@utils/sotp-utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SubmitProps {
  pin?: string;
}

interface Props {}
const useSotpVerifyHook = (props: Props) => {
  const [t] = useTranslation();
  const [pinCode, setPinCode] = useState<string>();
  const [pinError, setPinError] = useState<string>();
  let pinAttempts = 0;

  useEffect(() => {
    setPinError('');
  }, [pinCode]);

  const onPinFillDone = async ({ pin }: SubmitProps) => {
    const sotpValid = await sotpUtils.checkPin(Number(pin));
    if (sotpValid) {
      pinAttempts = 0;
      setPinError('');
      replace(APP_SCREEN.GENERATED_SOTP_TRANSACTION);
    } else {
      pinAttempts++;
      if (pinAttempts < 4) {
        setPinError(t('text:sotp_verify_pin_error'));
      } else {
        onLockSmartOtpDialog();
        sotpUtils.LockSOTP();
      }
    }
  };
  const onLockSmartOtpDialog = () => {
    showAlert({
      title: t('alert:notify'),
      content: t('alert:sotp_verify_pin_locked'),
      type: 'alert',
      actions: [
        {
          title: t('text:close'),
          type: 'primary',
          onPress: logout,
        },
      ],
    });
  };

  const onCancel = () => {
    goBack();
  };

  return {
    onCancel,
    pinCode,
    setPinCode,
    onPinFillDone,
    pinError,
  };
};

export default useSotpVerifyHook;
