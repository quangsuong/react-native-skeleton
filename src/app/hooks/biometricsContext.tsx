import {
  BugsnagUtil,
  iconsBiometric,
  K_SIZE_SCALE_24,
  STORAGE_KEY_STATUS_LOGIN,
  TOUCH_FACEID,
  TypeErrBiometric,
  TYPE_BIOMETRIC,
} from '@common';
import { ENVConfig } from '@config/env';
import { loadString, saveString } from '@utils/storage';
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import Keychain from 'react-native-keychain';
import { showAlert } from '@components/alert';
import { InfoBiometric } from '@features/un-authentication/login/type';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, Platform } from 'react-native';
import { biometricsChanged, refreshTracker } from 'react-native-check-biometric-changed';
// @ts-ignore
import { IconSvgLocal } from '@components/icon-vec-local';
import { useTheme } from '@theme';
import RNFingerprintChange from 'react-native-biometrics-changed';
import eventConstant from '../common/constant/eventConstant';
import { useToast } from './useToast';

const rnBiometrics = new ReactNativeBiometrics();

export const dataInfoBiometricFirst: InfoBiometric = {
  isFirstLogin: true,
  isLoginBiometricsEnabled: false,
  isAutoLoginByBioMetric: false,
  isLoginPinEnabled: false,
  userId: '',
  name: '',
};

interface TypeCallBiometric {
  type: 'login' | 'setting_login' | 'setting_otp';
}

interface OtherBioPromptParams {
  noNeedCheckChange?: boolean;
}

interface IBiometricsContext {
  isBiometricsSupported: boolean;
  infoBiometric: InfoBiometric;
  isBiometricsLoading: boolean;
  biometricsType: Keychain.BIOMETRY_TYPE | null;
  enableBiometrics: () => Promise<void>;
  disableBiometrics: () => Promise<void>;
  promptBiometrics: (
    title?: string,
    callBackSuccess?: () => void,
    callBackFail?: (type: TypeErrBiometric) => void,
    type?: TypeCallBiometric['type'],
    otherPromptParams?: OtherBioPromptParams
  ) => Promise<false | Keychain.UserCredentials>;
  checkBioMetricExist: (checkBioMetricExist?: boolean) => Promise<boolean>;
  handleChangeInfoBiometric: (value: any, name: keyof typeof dataInfoBiometricFirst) => void;
  handleChangeInfoBiometricObj: (data: InfoBiometric) => void;
  enableAutoScanBio: () => Promise<void>;
  disableAutoScanBio: () => Promise<void>;
}

const BiometricsContext = createContext<IBiometricsContext>({
  isBiometricsSupported: false,
  infoBiometric: dataInfoBiometricFirst,
  isBiometricsLoading: true,
  biometricsType: null,
  enableBiometrics: async () => undefined,
  disableBiometrics: async () => undefined,
  // @ts-ignore
  checkBioMetricExist: () => Promise<boolean>,
  // @ts-ignore
  promptBiometrics: (
    title?: string,
    callBackSuccess?: () => void,
    callBackFail?: () => void,
    type?: TypeCallBiometric['type'],
    otherPromptParams: OtherBioPromptParams
  ) => {},
  handleChangeInfoBiometric: (value: any, name: keyof typeof dataInfoBiometricFirst) => {},
  handleChangeInfoBiometricObj: (data: any) => {},
  enableAutoScanBio: async () => undefined,
  disableAutoScanBio: async () => undefined,
});

export const BiometricsProvider: FC = ({ children }) => {
  const [isBiometricsSupported, setBiometricsSupported] = useState(false);
  const [biometricsType, setBiometricsType] = useState<Keychain.BIOMETRY_TYPE | null>(null);
  const [isBiometricsLoading, setBiometricsLoading] = useState(true);
  const [infoBiometric, setInfoBiometric] = useState({});
  const [t] = useTranslation();
  const toast = useToast();
  const { colors } = useTheme();

  const getTypeBiometric = async () => {
    const option: Keychain.Options = {
      service: ENVConfig.BUNDLE_IDENTIFIER,
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
      accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
      storage: Keychain.STORAGE_TYPE.RSA,
    };
    const type = await Keychain.getSupportedBiometryType(option);
    return type;
  };

  useEffect(() => {
    const init = async () => {
      const type = await getTypeBiometric();
      if (type) {
        // dùng để hiển thị trong mh cài đặt vì khi không bật hoặc lỗi sẽ ko lấy đc loại biometric;
        saveString(TYPE_BIOMETRIC, type);
      }
      // handleChangeInfoBiometricObj({"isFirstLogin": true,"isLoginBiometricsEnabled": true, "isLoginPinEnabled": true, "userId": "", "name": ""})
      setBiometricsSupported(!!type);
      setBiometricsType(type);
      getInfoBiometric(type);
    };
    init();
  }, []);

  const getInfoBiometric = (type: any) => {
    try {
      const statusLoginLocal = loadString(STORAGE_KEY_STATUS_LOGIN);
      if (statusLoginLocal) {
        const data: InfoBiometric = JSON.parse(statusLoginLocal);
        if (type == null) {
          data.isLoginBiometricsEnabled = false;
        }
        saveString(STORAGE_KEY_STATUS_LOGIN, JSON.stringify(data));
        setInfoBiometric(data);
      }
    } catch (error) {
      console.log('loi lay thong tin biometric', error);
    }
  };

  const handleChangeInfoBiometric = (
    value: any,
    name: keyof typeof infoBiometric,
    isShowToast = true
  ) => {
    try {
      let dataBase: any;
      const statusLoginLocal = loadString(STORAGE_KEY_STATUS_LOGIN);
      if (statusLoginLocal) {
        dataBase = JSON.parse(statusLoginLocal);
      }
      const data: InfoBiometric = dataBase ?? { ...infoBiometric };
      data[name] = value;
      //TODO auto scan follow status of scan faceid
      if (name === 'isLoginBiometricsEnabled') {
        data.isAutoLoginByBioMetric = value;
      }
      console.log('handle data', data);
      saveString(STORAGE_KEY_STATUS_LOGIN, JSON.stringify(data));
      setInfoBiometric(data);
      isShowToast &&
        toast.show(
          t(
            `alert:${value ? 'setup_biometric_success' : 'deactive_login_bio_success'}`,
            t18BiometricConfig
          ),
          {
            icon: biometricsType ? (
              <IconSvgLocal
                name={iconsBiometric[biometricsType]}
                color={value ? colors.color_success_500 : colors.color_1000}
                height={K_SIZE_SCALE_24}
                width={K_SIZE_SCALE_24}
              />
            ) : (
              <></>
            ),
          }
        );
    } catch (error) {
      console.log('errr', error);
    }
  };

  const handleChangeInfoBiometricObj = (data: any) => {
    let dataBase;

    const statusLoginLocal = loadString(STORAGE_KEY_STATUS_LOGIN);
    if (statusLoginLocal) {
      dataBase = JSON.parse(statusLoginLocal);
    }

    const dataCoppyInfoBiometric = dataBase ?? { ...infoBiometric };

    const dataCopy: InfoBiometric = { ...dataCoppyInfoBiometric, ...data };
    saveString(STORAGE_KEY_STATUS_LOGIN, JSON.stringify(dataCopy));
    setInfoBiometric(dataCopy);
  };

  const enableBiometrics = async () => {
    handleChangeInfoBiometric(true, 'isLoginBiometricsEnabled');
  };

  const disableBiometrics = async () => {
    handleChangeInfoBiometric(false, 'isLoginBiometricsEnabled');
  };

  const enableAutoScanBio = async () => {
    handleChangeInfoBiometric(true, 'isAutoLoginByBioMetric', false);
  };

  const disableAutoScanBio = async () => {
    handleChangeInfoBiometric(false, 'isAutoLoginByBioMetric', false);
  };

  const checkBioMetricExist = async (changeState?: boolean) => {
    try {
      const isExist = await rnBiometrics.isSensorAvailable();
      if (isExist.error && isExist.available == false) {
        if (isExist.error.indexOf('Code=-8') > 0) {
          // thử quá nhiều lần lỗi nó sẽ vào đây trên ios;
          changeState && handleChangeInfoBiometricObj({ isLoginBiometricsEnabled: false });
          return 'lock_biometric';
        }
        if (isExist.error.indexOf('Code=-6') > 0) {
          // khong cap quyen nó sẽ vào đây trên ios;
          changeState && handleChangeInfoBiometricObj({ isLoginBiometricsEnabled: false });
          return 'permission_biometric';
        }
        return isExist.available;
      }
      if (isExist.available && !biometricsType) {
        const type = await getTypeBiometric();
        setBiometricsType(type);
      }
      return isExist.available;
    } catch (error) {
      return false;
    }
  };

  const objTypeBiometric = {
    FaceID: t('text:face_id'),
    TouchID: t('text:fingerprint'),
    Fingerprint: t('text:fingerprint'),
    FACE: t('text:face_id'),
    IRIS: '',
  };

  const showAlertLockBiometric = useCallback(() => {
    const localBiometric = loadString(TYPE_BIOMETRIC);
    let dataBase;
    const statusLoginLocal = loadString(STORAGE_KEY_STATUS_LOGIN);
    if (statusLoginLocal) {
      dataBase = JSON.parse(statusLoginLocal);
    }

    const isLoginPinEnabled = !!dataBase?.isLoginPinEnabled;

    return showAlert({
      title: t('alert:notify'),
      // @ts-ignore
      content: t('alert:lock_biometric_login', {
        biometric_type: objTypeBiometric[biometricsType ?? localBiometric] ?? TOUCH_FACEID,
        type: isLoginPinEnabled ? 'PIN' : t('text:password'),
      }),
      type: 'confirm',
      actions: [
        {
          title: isLoginPinEnabled ? t('text:login_with_pincode') : t('text:agree'),
        },
      ],
    });
  }, [infoBiometric.isLoginPinEnabled, biometricsType]);

  const t18BiometricConfig = useMemo(
    () => ({
      biometric_type: objTypeBiometric[biometricsType] ?? TOUCH_FACEID,
    }),
    [biometricsType]
  );

  const promptBiometrics = async (
    title: string,
    callBackSuccess: (data?: any) => void,
    callBackFail: (typeEror?: TypeErrBiometric) => void,
    type?: TypeCallBiometric['type'],
    otherParams?: OtherBioPromptParams
  ) => {
    try {
      const isBiometricExist = await checkBioMetricExist(true);
      if (isBiometricExist == 'lock_biometric') {
        // khi mở khoá quá nhiều lần trên ios thì sẽ vào đây;
        if (type == 'setting_login') {
          callBackFail && callBackFail('lock_ios');
          return;
        }
        showAlertLockBiometric();
        return;
      }

      if (isBiometricExist == 'permission_biometric') {
        callBackFail && callBackFail('not_permission');
        return;
      }

      if (!isBiometricExist) {
        callBackFail && callBackFail('not_setup');
        return;
      }

      if (!otherParams?.noNeedCheckChange) {
        const statusBiometric = await checkBiometricsChanged();
        if (!statusBiometric) {
          return;
        }
      }
      window.openBiometric = true;

      rnBiometrics
        .simplePrompt({
          fallbackPromptMessage: t('text:biometric_not_correct'),
          cancelButtonText: t('text:cancel'),
          promptMessage: title || t('text:biometric_authen', t18BiometricConfig),
        })
        .then(async (resultObject) => {
          const { success } = resultObject;
          if (success) {
            callBackSuccess && callBackSuccess(resultObject);
          } else {
            if (Platform.OS == 'ios') {
              const isBiometricExist = await checkBioMetricExist();
              if (isBiometricExist == 'lock_biometric') {
                handleChangeInfoBiometricObj({
                  isLoginBiometricsEnabled: false,
                });
                callBackFail && callBackFail('lock_android');
                if (type == 'login') {
                  showAlertLockBiometric();
                }
              } else {
                callBackFail && callBackFail('user_cancel');
              }
            } else {
              callBackFail && callBackFail('user_cancel');
            }
          }
        })
        .catch((error) => {
          console.log('catch', error);
          switch (type) {
            case 'login':
              if (Platform.OS == 'android') {
                handleChangeInfoBiometricObj({
                  isLoginBiometricsEnabled: false,
                });
                showAlertLockBiometric();
              } else {
                if (JSON.stringify(error).indexOf('Code=-6') > 0) {
                  // khong co quyen
                  handleChangeInfoBiometricObj({
                    isLoginBiometricsEnabled: false,
                  });
                  toast?.show(
                    t('alert:not_permission_biometric', {
                      biometric_type: objTypeBiometric[biometricsType] ?? TOUCH_FACEID,
                    }),
                    { type: 'danger' }
                  );
                }
                if (JSON.stringify(error).indexOf('Code=-8') > 0) {
                  // biometric lock
                  console.log('vao day khoa biometric');
                  handleChangeInfoBiometricObj({
                    isLoginBiometricsEnabled: false,
                  });
                  showAlertLockBiometric();
                }
              }
              break;
            case 'setting_login':
              if (JSON.stringify(error).indexOf('Code=-6') > 0) {
                // khong co quyen
                callBackFail && callBackFail('not_permission');
              } else if (JSON.stringify(error).indexOf('Code=-8') > 0) {
                // biometric lock
                callBackFail && callBackFail('lock_ios');
              } else {
                callBackFail && callBackFail('lock_android');
              }
              break;
            case 'setting_otp':
              break;
            default:
              break;
          }
        })
        .finally(() => {
          window.openBiometric = false;
          DeviceEventEmitter.emit(eventConstant.CLOSE_BIOMETRIC);
        });
    } catch (error: any) {
      BugsnagUtil.notify(error);
    }
  };

  const biometricCreateKey = async () => {
    rnBiometrics.createKeys().then((rs) => {
      console.log('====================================');
      console.log('createKeys', rs);
      console.log('====================================');
    });
  };

  const biometricDeleteKeys = async () => {
    rnBiometrics.deleteKeys().then((resultObject) => {
      const { keysDeleted } = resultObject;

      if (keysDeleted) {
        console.log('Successful deletion');
      } else {
        console.log('Unsuccessful deletion because there were no keys to delete');
      }
    });
  };

  const checkBiometricsChanged = async () => {
    const showAlertBiometricChange = () => {
      showAlert({
        title: t('alert:biometric_change'),
        // @ts-ignore
        content: t('alert:des_biometric_change_login'),
        type: 'confirm',
        actions: [
          {
            title: t('text:agree'),
          },
        ],
      });
    };

    if (Platform.OS == 'ios') {
      const biometricWasChanged = await biometricsChanged();
      if (biometricWasChanged) {
        refreshTracker();
        handleChangeInfoBiometric(false, 'isLoginBiometricsEnabled', false);
        showAlertBiometricChange();
        return false;
      } else {
        return true;
      }
    } else {
      const biometricsHasChanged = await RNFingerprintChange.hasFingerPrintChanged();
      if (biometricsHasChanged) {
        handleChangeInfoBiometric(false, 'isLoginBiometricsEnabled', false);
        showAlertBiometricChange();
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <BiometricsContext.Provider
      value={{
        isBiometricsSupported,
        infoBiometric,
        isBiometricsLoading,
        biometricsType,
        enableBiometrics,
        disableBiometrics,
        // @ts-ignore
        checkBioMetricExist,
        // @ts-ignore
        promptBiometrics,
        handleChangeInfoBiometric,
        handleChangeInfoBiometricObj,
        enableAutoScanBio,
        disableAutoScanBio,
      }}
    >
      {children}
    </BiometricsContext.Provider>
  );
};

export default function useBiometrics() {
  return useContext(BiometricsContext);
}
