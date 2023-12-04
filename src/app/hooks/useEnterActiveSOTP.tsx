import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useTheme } from '@theme';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  initUsername?: string;
  from?: string;
}
const useEnterActiveSOTP = (props: Props) => {
  const [t] = useTranslation();
  const { colors } = useTheme();
  const [otpMessage, setOtpMessage] = useState(t('text:enter_active_otp_message'));

  const onCodeField = (code: String) => {
    navigate('SMART_OTP_NEW_PIN', { isActiveSotpFlow: true });
  };
  const onCancel = () => {
    navigate(APP_SCREEN.LOGIN);
  };

  return {
    colors,
    otpMessage,
    onCodeField,
    onCancel,
  };
};
export default useEnterActiveSOTP;
