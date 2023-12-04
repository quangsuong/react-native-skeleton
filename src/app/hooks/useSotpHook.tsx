import { showAlert } from '@components/alert';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useRoute } from '@react-navigation/native';
import sotpUtils from '@utils/sotp-utils';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {}

const useSotpHook = (props: Props) => {
  const route = useRoute();
  const transactionId = route.params?.transactionId || '';
  const [t] = useTranslation();
  const [otpCode, setOtpCode] = useState<string>();

  useEffect(() => {
    generateOCRA();
  }, []);

  const generateOCRA = () => {
    sotpUtils
      .generateOCRA(transactionId)
      .then((value) => {
        setOtpCode(value);
      })
      .catch((error) => {
        showAlert({
          title: t('alert:notify'),
          content: t('alert:error'),
          type: 'alert',
          actions: [
            {
              title: t('text:close'),
              onPress: goBack,
            },
          ],
        });
      });
  };

  const onSubmit = () => {
    navigate(APP_SCREEN.ACKNOWLEDGEMENT_APPROVE);
  };

  const onReloadTimer = useCallback(() => {
    generateOCRA();
  }, []);

  return {
    otpCode,
    setOtpCode,
    onSubmit,
    onReloadTimer,
  };
};

export default useSotpHook;
