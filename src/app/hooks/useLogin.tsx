import {
  BugsnagUtil,
  dispatch,
  FORMART_DATE_TIME,
  STORAGE_KEY_ERR_PASS_LOGIN,
  STORAGE_KEY_PIN_LOGIN_ERR,
} from '@common';
import { hideLoading, showLoading, Text } from '@components';
import { showAlert } from '@components/alert';
import { BottomSheet } from '@components/bottom-sheet';
import { CardType, RegisterOptions, RegisterType } from '@features/un-authentication/login/type';
import { navigate } from '@navigation/navigation-service';
import { LOGIN } from '@redux-action-type/authentication';
import { selectInfoAccount, selectSotp } from '@redux-selector/app';
import { useTheme } from '@theme';
import signinUtils from '@utils/signin-utils';
import { loadString, remove, saveString } from '@utils/storage';
import { StorageSecure } from '@utils/storage-secure';
import { Utils } from '@utils/utils';
import JailMonkey from 'jail-monkey';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureResponderEvent, Keyboard, View } from 'react-native';
import { useSelector } from 'react-redux';
import { appActions } from '../redux/action-slice/app';
import { commonActions } from '../redux/action-slice/common';
import useBiometrics, { dataInfoBiometricFirst } from './biometricsContext';
import useAnimatedLogin from './useAnimatedLogin';
import { useToast } from './useToast';
// import { loginFake } from '@dataFakes/loginFake';
// import RNRestart from 'react-native-restart';
import { LANGUAGE_TYPE } from '@config/type';
import { DataCountLoginFailWithPass, DataResultLoginFail } from '@model/authentication';
import { APP_SCREEN } from '@navigation/screen-types';
import { hapticFire } from '@utils/haptic-utils';
import useLanguage from './useLanguage';
interface SubmitProps extends GestureResponderEvent {
  password?: string;
}

interface Props {
  initUsername?: string;
  from?: string;
}

const useLogin = (props: Props) => {
  const [t] = useTranslation();
  const { colors } = useTheme();
  const { customer: _customer } = useSelector(selectInfoAccount); // chuyen sang dung reducer account
  const isActivedSotp = useSelector(selectSotp);
  const modalizeRef = useRef<BottomSheet>(null);
  const modalizeSubMenuRef = useRef<BottomSheet>(null);
  const [textErrPin, setTextErrPin] = useState('');
  const [pinCode, setPinCode] = useState<string | undefined>(undefined);
  const [isVisibleModalPIN, setIsVisibleModalPIN] = useState<boolean>(false);
  const [isAgreeTerm, setIsAgreeTerm] = useState<boolean>(false);
  const [customer, setCustomer] = useState(_customer);
  let countPinCodeErr: any = 0;

  const {
    isKeyboardShow,
    boxListAction,
    isHidePassWord,
    setIsHidePassWord,
    getHeightBoxListAction,
  } = useAnimatedLogin();

  const {
    infoBiometric,
    promptBiometrics,
    handleChangeInfoBiometricObj,
    biometricsType,
    enableBiometrics,
  } = useBiometrics();

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
  // const enableShowIntro = useSelector(selectShowIntro);
  const toast = useToast();
  const { language, onPressVn, onPressEn } = useLanguage();

  const loginToContinue = useCallback(() => {
    if (customer?.userId) {
      if (infoBiometric?.isLoginBiometricsEnabled) {
        return loginWithBiometric('other', undefined, t('text:signin_to_continue'));
      }
      if (infoBiometric?.isLoginPinEnabled) {
        setIsVisibleModalPIN(true);
      }
    }
    toast.show(t('text:signin_to_continue'));
  }, [infoBiometric]);

  const [statusValidate, setStatusValidate] = useState(false);

  const [dataLogin, setDataLogin] = useState({
    userId: props.initUsername ? props.initUsername : __DEV__ ? '0982351333' : '',
    password: __DEV__ ? 'Kony@1234' : '',
  });
  const validateDataLogin = () => {
    const { userId, password } = dataLogin;
    if (userId && password) {
      setStatusValidate(true);
    } else {
      setStatusValidate(false);
    }
  };

  useEffect(() => {
    // remove(STORAGE_KEY_STATUS_LOGIN)
    if (customer?.userName) {
      dataLogin.userId = customer?.userName ?? customer?.userId;
      setDataLogin(dataLogin);
    }
  }, [customer?.userId, customer?.userName]);

  useEffect(() => {
    validateDataLogin();
  }, [dataLogin.password, dataLogin.userId]);

  const handleChangeDataLogin = (value: string, name: 'userId' | 'password') => {
    const data = { ...dataLogin };
    data[name] = value;
    setDataLogin(data);
  };

  const onSubmit = ({ password, userId }: SubmitProps) => {
    Keyboard.dismiss();
    if (!__DEV__) {
      if (JailMonkey.isJailBroken()) {
        return showAlert({
          title: t('alert:notify'),
          content: t('text:jailbreak'),
          actions: [{ title: t('text:cancel') }],
        });
      }
    }
    showLoading();
    const body = {
      ...dataLogin,
      password: password || dataLogin.password,
      userId: userId || dataLogin.userId,
    };
    dispatch({
      type: LOGIN,
      payload: { body, onSucceeded, onFailure, from: props.from },
    });
  };

  const onSucceeded = (data: any) => {
    const { customer } = data;
    clearCurrentAccount(data);
    resetDataCountLoginFail(customer?.userId);
  };

  const onFailure = (data: DataResultLoginFail) => {
    hideLoading();
    if (data.responseCode == 'GW-401') {
      processsLoginFail(data);
    } else if (
      data.responseCode === 'US_011' ||
      data.responseCode === 'US_012'
      // || data.responseCode === 'US_014' // tk disable tren keycloak
    ) {
      showAlert({
        title: t('alert:register_digital'),
        content: t('alert:your_account_is_not_registerd'),
        image: {
          name: 'IMG_SOTP_SUCCESS',
          height: 240,
        },
        type: 'confirm',
        actions: [
          {
            title: t('text:register'),
            onPress: modalizeSubMenuRef.current?.openBottomSheet,
          },
        ],
      });
    }
    // else if (
    //   data.responseCode === 'US_014'
    // ) {
    //   showAlert({
    //     title: t('alert:notify'),
    //     content: t('alert:your_account_is_locked'),
    //     type: 'confirm',
    //     actions: [
    //       {
    //         title: t('text:close'),
    //       },
    //     ],
    //   });
    // }
    else {
      data?.message &&
        data.message != 'UNKNOWN' &&
        showAlert({
          title: t('alert:notify'),
          content: data.message,
          type: 'confirm',
          actions: [
            {
              title: t('text:cancel'),
            },
          ],
        });
    }
  };

  const checkLockAccountLocal = (userId: any) => {
    let status = true;
    let dataCountLoginFailLocal: any = loadString(userId + STORAGE_KEY_ERR_PASS_LOGIN);
    if (dataCountLoginFailLocal) {
      dataCountLoginFailLocal = JSON.parse(dataCountLoginFailLocal);
      const timeActive = moment(dataCountLoginFailLocal.timeOpen);

      const timeNow = moment();
      if (timeActive.isAfter(timeNow)) {
        const count = Number(dataCountLoginFailLocal.countLoginFail);
        if (count >= 5) {
          status = false;
          showAlertErrLockAccount(moment(timeActive).format(FORMART_DATE_TIME));
        }
      }
    }

    return status;
  };

  const resetDataCountLoginFail = (userId: any) => {
    try {
      const dataCountLoginFailLocal: any = loadString(userId + STORAGE_KEY_ERR_PASS_LOGIN);
      if (dataCountLoginFailLocal) {
        remove(userId + STORAGE_KEY_ERR_PASS_LOGIN);
      }
    } catch (error) {
      // @ts-ignore
      BugsnagUtil.notify(error);
    }
  };

  const showAlertErrCount = useCallback(
    (count: any, errcode: string) =>
      showAlert({
        title: t('alert:wrong_info_login'),
        content: t('alert:login_password_err', { count }) + ` (${errcode})`,
        type: 'confirm',
        actions: [
          {
            title: t('text:forgot_password'),
            onPress: () => navigate('FORGOT_PASSWORD'),
            type: 'secondary',
          },
          {
            title: t('alert:try_again'),
          },
        ],
      }),
    []
  );

  const showAlertErrLockAccount = useCallback(
    (date: any, errcode?: string) =>
      showAlert({
        title: t('alert:account_has_lock'),
        content: t('alert:your_account_is_locked'),
        contentComponent: (
          <View>
            <Text textAlign={'center'} preset="body1" t18n="alert:account_login_err_5">
              <Text preset="body1" color={colors.color_link_600} />
              <Text preset="body1" color={colors.color_link_600} t18n="alert:to_support" />
            </Text>
            {/* <Spacer height={K_SIZE_SCALE_24}/> */}

            <Text textAlign={'center'} preset="body1">
              {t('alert:account_reopened_at')}
              <Text preset="body1" color={colors.color_link_600}>
                {date}
              </Text>{' '}
              ({errcode})
            </Text>
          </View>
        ),
        type: 'confirm',
        actions: [
          {
            title: t('text:close'),
            type: 'secondary',
          },
          {
            title: t('text:call_hotline'),
            onPress: () => Utils.callHotline(),
            iconName: 'IC_CALL_OUTLINE',
          },
        ],
      }),
    []
  );

  const processsLoginFail = useCallback((data: DataResultLoginFail) => {
    console.log('====================================');
    console.log('processsLoginFail', data);
    console.log('====================================');

    const remainNum = +data?.remainNum;
    const numOfTry = 5 - remainNum;
    const errcode = data?.errcode;

    if (errcode === 11000) {
      // sai tk mk
      return showAlert({
        title: t('alert:notify'),
        content: t('error:GW-401') + ` (${errcode})`,
        type: 'confirm',
        actions: [
          {
            title: t('text:close'),
            type: 'secondary',
          },
          {
            title: t('text:call_hotline'),
            type: 'primary',
            onPress: () => Utils.callHotline(),
          },
        ],
      });
    }

    const isLock = errcode === 10088;
    let timeOpen = null;

    if (isLock) {
      // khoa
      timeOpen = Date.now() + remainNum * 6e4; // to millisecond
      showAlertErrLockAccount(moment(timeOpen).format(FORMART_DATE_TIME), errcode);
    } else {
      showAlertErrCount(numOfTry, errcode);
    }

    const dataCountLoginFail: DataCountLoginFailWithPass = {
      countLoginFail: isLock ? '5' : numOfTry,
      userId: data.userId,
      password: data.password,
      time: moment().format(FORMART_DATE_TIME),
      timeOpen,
    };

    saveString(data.userId + STORAGE_KEY_ERR_PASS_LOGIN, JSON.stringify(dataCountLoginFail));
  }, []);

  const { getItem, deleteItem } = StorageSecure;

  const loginWithBiometric = useCallback(
    async (type?: 'pin' | 'other', value?: string, customBioTitlte?: string) => {
      const getPass = async () => {
        try {
          const password = await getItem('K_PASS_WORD');
          setTimeout(() => {
            // @ts-ignore
            onSubmit({ password });
          }, 100);
        } catch (error) {
          //@ts-ignore
          BugsnagUtil.notify(error);
        }
      };

      if (type == 'pin') {
        const checkPin = await signinUtils.checkPin(Number(value));
        if (checkPin) {
          countPinCodeErr = 0;
          saveString(STORAGE_KEY_PIN_LOGIN_ERR, countPinCodeErr);
          setIsVisibleModalPIN(false);
          getPass();
        } else {
          countPinCodeErr = countPinCodeErr + 1;
          if (5 - countPinCodeErr > 0) {
            saveString(STORAGE_KEY_PIN_LOGIN_ERR, countPinCodeErr);
            setTextErrPin(t('text:pin_text_error', { number_err: 5 - countPinCodeErr }));
            setPinCode(undefined);
          } else {
            setIsVisibleModalPIN(false);
            handleChangeInfoBiometricObj({
              isLoginPinEnabled: false,
              isLoginBiometricsEnabled: false,
            });
            // deleteItem('STORAGE_KEY_PIN_LOGIN');
            signinUtils.cleanData();
            setTimeout(() => {
              showAlert({
                title: t('alert:notify'),
                // @ts-ignore
                content: t('alert:disable_pin_code'),
                type: 'confirm',
                actions: [
                  {
                    title: t('text:agree'),
                  },
                ],
              });
            }, 300);
          }
        }
      } else {
        const title =
          customBioTitlte ??
          t('text:biometric_authen', {
            biometric_type: objTypeBiometric[biometricsType],
          });
        promptBiometrics(
          title,
          () => getPass(),
          (typeError) => {
            console.log(typeError, customBioTitlte);
            if (typeError == 'not_setup') {
              toast?.show(t('alert:device_not_setup_biometric', biometric_type), {
                type: 'danger',
              });
              handleChangeInfoBiometricObj({
                isLoginBiometricsEnabled: false,
              });
            }
          },
          'login'
        );
      }
    },
    []
  );

  const optionsRegsiter: RegisterOptions[] = useMemo(
    () => [
      {
        id: 0,
        title: t('text:create_new_account'),
        content: t('text:des_create_new_account'),
        value: RegisterType.NEW_USER,
      },
      {
        id: 1,
        title: t('text:already_have_account'),
        content: t('text:already_have_account_des'),
        value: RegisterType.HAD_ACCOUNT,
      },
      {
        id: 2,
        title: t('text:opened_account'),
        content: t('text:opened_account_des'),
        value: RegisterType.OPENED_CARD,
      },
      {
        id: 3,
        title: t('text:used_to_borrow'),
        content: t('text:used_to_borrow_des'),
        value: RegisterType.BORROWED,
      },
    ],
    []
  );

  const optionsSubRegsiter = useMemo(
    () => [
      {
        id: 0,
        title: t('text:citizen_id_with_chip'),
        content: t('text:citizen_id_with_chip_des'),
        value: CardType.CITIZEN_ID_WITH_CHIP,
      },
      {
        id: 1,
        title: t('text:citizen_id_without_chip'),
        content: t('text:citizen_id_without_chip_des'),
        value: CardType.CITIZEN_ID_WITHOUT_CHIP,
      },
    ],
    []
  );

  const siginAnotherAccount = useCallback(() => {
    setCustomer({});
    setDataLogin({ userId: '', password: '' });
    // setDataLogin({ userId: '0364597921', password: 'Kony@1234' });
  }, []);

  const clearCurrentAccount = useCallback((data) => {
    if (data?.customer?.userName === customer?.userName) {
      return;
    }

    // setTimeout(() => {
    handleChangeInfoBiometricObj(dataInfoBiometricFirst);
    // setDataLogin({ userId: '', password: '' });
    StorageSecure.deleteItems(['K_PASS_WORD', 'K_USER_NAME', 'STORAGE_KEY_PIN_LOGIN']);
    // sotpUtils.cleanData();
    signinUtils.cleanData();
    dispatch(appActions.reset());
    dispatch(commonActions.reset());
    // }, 200);
    BugsnagUtil.reset();
  }, []);

  const onPressSwitchAccount = useCallback(() => {
    showAlert({
      title: t('alert:notify'),
      content: t('alert:switch_account_confirm_content'),
      type: 'confirm',
      actions: [
        {
          title: t('dialog:cancel'),
          type: 'secondary',
        },
        {
          title: t('text:yes'),
          type: 'primary',
          onPress: siginAnotherAccount,
        },
      ],
    });
  }, []);

  const onChangeLanguage = useCallback(() => {
    hapticFire('impactMedium');
    if (language !== LANGUAGE_TYPE.vi) {
      onPressVn();
    } else {
      onPressEn();
    }
    toast.show(t('text:change_lang_success'));
  }, [language]);

  const gotoForgotPassword = useCallback(() => {
    navigate(APP_SCREEN.FORGOT_PASSWORD);
  }, []);
  const gotoGuide = useCallback(() => {
    navigate(APP_SCREEN.UN_AUTHORIZE);
  }, []);
  const gotoTermAndCondition = useCallback(() => {
    modalizeRef?.current?.closeBottomSheet();
    navigate(APP_SCREEN.UN_AUTHORIZE);
  }, []);
  const onResetSotpPIN = useCallback(() => {
    modalizeRef?.current?.closeBottomSheet();
    navigate(APP_SCREEN.SMART_OTP_RESET_PIN);
  }, []);
  const onGetOTP = useCallback(() => {
    modalizeRef?.current?.closeBottomSheet();
    navigate(APP_SCREEN.GENERATED_SOTP_VERIFY);
  }, []);
  const onCancelSotp = useCallback(() => {
    modalizeRef?.current?.closeBottomSheet();
  }, []);

  return {
    colors,
    dataLogin,
    statusValidate,
    optionsRegsiter,
    boxListAction,
    isHidePassWord,
    infoBiometric,
    textErrPin,
    pinCode,
    loginWithBiometric,
    onSubmit,
    handleChangeDataLogin,
    setIsHidePassWord,
    getHeightBoxListAction,
    customer,
    onPressSwitchAccount,
    setPinCode,
    setTextErrPin,
    isVisibleModalPIN,
    setIsVisibleModalPIN,
    biometricsType,
    optionsSubRegsiter,
    modalizeRef,
    modalizeSubMenuRef,

    // onPressQR,

    // refModalTransfer,
    // onOpenModalTransfer,
    // transferToOther,
    // transferToMySelf,
    // transferToCardId,
    language,
    onChangeLanguage,
    gotoForgotPassword,
    gotoGuide,
    gotoTermAndCondition,
    isKeyboardShow,
    isAgreeTerm,
    setIsAgreeTerm,
    isActivedSotp,
    onResetSotpPIN,
    onGetOTP,
    onCancelSotp,
  };
};

export default useLogin;
