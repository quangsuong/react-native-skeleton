import { TypeErrBiometric } from '@common';
import { BiometricUI, PropsBiometricUI } from '@components/biometric_ui';
import useBiometrics from '@customHooks/biometricsContext';
import { useToast } from '@customHooks/useToast';
import { useTheme } from '@theme';
import React, { memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

const SettingBiometricComponent = ({
  title,
  des,
  labelButton,
  img,
  actionButton = () => {},
  isRegisterPin = false,
  checkErr = false,
}: PropsBiometricUI) => {
  const { colors } = useTheme();
  const [t] = useTranslation();
  const { biometricsType, promptBiometrics } = useBiometrics();
  const toast = useToast();

  const objTypeBiometric = useMemo(() => {
    return {
      FaceID: t('text:face_id'),
      TouchID: t('text:fingerprint'),
      Fingerprint: t('text:fingerprint'),
      FACE: t('text:face_id'),
      IRIS: '',
    };
  }, []);

  const biometric_type = {
    // @ts-ignore
    biometric_type: objTypeBiometric[biometricsType],
  };

  const doBiometricError = useCallback((typeErr: TypeErrBiometric) => {
    if (checkErr) {
      switch (typeErr) {
        case 'not_setup':
          // @ts-ignore
          // toast?.show(t('alert:device_not_setup_biometric', bioMetricText), {
          //   type: 'danger',
          // });
          break;
        // case 'user_cancel':
        case 'lock_android':
          // @ts-ignore
          // toast?.show(t('text:biometric_last_try', bioMetricText), {
          //   type: 'danger',
          // });
          break;
        case 'lock_ios':
          // @ts-ignore
          // toast?.show(t('alert:lock_setting_biometric_login', bioMetricText), {
          //   type: 'danger',
          // });
          break;
        case 'not_permission':
          // @ts-ignore
          // toast?.show(t('alert:not_permission_biometric', bioMetricText), {
          //   type: 'danger',
          // });
          break;
        default:
          break;
      }
    }
  }, []);

  const settingRegister = useCallback(() => {
    if (isRegisterPin) {
      actionButton();
    } else {
      promptBiometrics(undefined, actionButton, doBiometricError, 'setting_login', {
        noNeedCheckChange: true,
      });
    }
  }, []);

  return (
    <BiometricUI
      title={t(title, biometric_type)}
      des={t(des, biometric_type)}
      // @ts-ignore
      img={img ?? 'IMG_SERCURITY_FACEID'}
      actionButton={settingRegister}
      labelButton={t(labelButton, biometric_type)}
    />
  );
};

export const SettingBiometric = memo(SettingBiometricComponent, isEqual);
