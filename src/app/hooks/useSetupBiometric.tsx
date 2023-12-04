import { DebugUtils } from '@common';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN, UN_AUTHORIZE_SCREEN } from '@navigation/screen-types';
import { useTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import useBiometrics from './biometricsContext';

const useSetupBiometric = () => {
  const [t] = useTranslation();
  const { colors } = useTheme();
  const useBiometric = useBiometrics();

  const onSkip = () => {
    navigate(UN_AUTHORIZE_SCREEN.LOGIN);
  };
  const onSubmit = () => {
    useBiometric.promptBiometrics(
      '',
      () => {
        useBiometric.enableBiometrics();
        navigate(APP_SCREEN.LOGIN);
      },
      () => {
        DebugUtils.logS('SetupBiometric fail');
      }
    );
  };

  return {
    colors,
    useBiometric,
    onSkip,
    onSubmit,
  };
};
export default useSetupBiometric;
