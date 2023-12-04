import { PIN_STEP } from '@components/pin-setup/type';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onSuccess?: (pin: string) => void;
}

const useSetupPinHook = ({ onSuccess }: Props) => {
  const [t] = useTranslation();
  const [pinStep, setPinStep] = useState<PIN_STEP>(1);
  const [pinCode, setPinCode] = useState<string>('');
  const [confirmPinCode, setConfirmPinCode] = useState<string>('');
  const [confirmPinCodeError, setConfirmPinCodeError] = useState<string>();

  const setPinChange = (value: string) => {
    if (pinStep === 1) {
      setPinCode(value);
    } else {
      setConfirmPinCode(value);
      setConfirmPinCodeError(t(''));
    }
  };

  const onPinFillDone = (value: string) => {
    if (pinStep === 1) {
      setPinStep(2);
    } else if (pinCode === value) {
      setConfirmPinCodeError(t(''));
      onSuccess && onSuccess(value);
    } else {
      setConfirmPinCodeError(t('text:sotp_pin_text_error'));
    }
  };

  return {
    pinStep,
    pinCode,
    confirmPinCode,
    setPinChange,
    onPinFillDone,
    confirmPinCodeError,
  };
};

export default useSetupPinHook;
