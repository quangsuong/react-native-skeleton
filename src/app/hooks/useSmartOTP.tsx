import { dispatch } from '@common';
import { hideLoading, showLoading } from '@components';
import { showAlert } from '@components/alert';
import useAnimatedLogin from '@customHooks/useAnimatedLogin';
import { fakeDevices } from '@fakeData/fakeDevices';
import { DataResultLoginFail } from '@model/authentication';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { ACTIVE } from '@redux-action-type/smartOTPaction';
import { useTheme } from '@theme';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureResponderEvent, Keyboard } from 'react-native';

interface Props {
  initUsername?: string;
  from?: string;
}
interface SubmitProps extends GestureResponderEvent {
  password?: string;
}
const useSmartOTP = (props: Props) => {
  const [t] = useTranslation();
  const { colors } = useTheme();
  const { isHidePassWord, setIsHidePassWord } = useAnimatedLogin();
  const [isSOTPActive, setIsSOTPActive] = useState(false);
  const [incorrectTime, setIncorrectTime] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState({});
  const [devices, setDevices] = useState(fakeDevices);
  const [dataLogin, setDataLogin] = useState({
    userId: '',
    password: '',
  });

  const [statusValidate, setStatusValidate] = useState(false);
  const validateDataLogin = () => {
    const { userId, password } = dataLogin;
    if (userId && password) {
      setStatusValidate(true);
    } else {
      setStatusValidate(false);
    }
  };
  useEffect(() => {
    validateDataLogin();
  }, [dataLogin.userId, dataLogin.password]);
  const handleChangeDataLogin = (value: string, name: 'userId' | 'password') => {
    const data = { ...dataLogin };
    data[name] = value;
    setDataLogin(data);
  };
  const onSendDevice = () => {
    setIsError(false);
    if (selectedDevice.id === 1) {
      navigate(APP_SCREEN.ENTER_ACTIVE_SOTP);
      return;
    }
    setIsError(true);
    if (incorrectTime === 3) {
      setIsError(false);
      setIncorrectTime(0);
      showFailAlert();
      return;
    }
    setIncorrectTime(incorrectTime + 1);
  };
  const showFailAlert = () => {
    showAlert({
      title: t('text:active_sotp_fail_guild_title'),
      content: t('text:active_sotp_fail_guild_des'),
      type: 'confirm',
      actions: [
        {
          title: t('text:guild_string'),
          type: 'primary',
          onPress: () => {
            setIsSOTPActive(true);
            navigate(APP_SCREEN.SOTP_GUILD);
          },
        },
      ],
    });
  };
  const onSubmit = ({ userId }: SubmitProps) => {
    Keyboard.dismiss();
    //For test
    showActivedSotpAlert();
    return;
    //handled late when have API
    showLoading();
    const body = {
      userId: userId,
    };
    dispatch({
      type: ACTIVE,
      payload: { body, onSucceeded, onFailure, from: props.from },
    });
  };
  const showActivedSotpAlert = () => {
    showAlert({
      title: t('alert:notify'),
      content: t('text:enter_active_alert_message'),
      type: 'confirm',
      actions: [
        {
          title: t('text:cancel'),
          type: 'secondary',
          onPress: () => {
            goBack();
          },
        },
        {
          title: t('text:reinstall'),
          type: 'primary',
          onPress: () => {
            setIsSOTPActive(true);
          },
        },
      ],
    });
  };
  const onSucceeded = (data: any) => {};

  const onFailure = (data: DataResultLoginFail) => {
    hideLoading();
    if (data.responseCode == 'GW-401') {
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
            onPress: () => {},
          },
        ],
      });
    } else {
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

  return {
    colors,
    isHidePassWord,
    isSOTPActive,
    setIsHidePassWord,
    statusValidate,
    onSubmit,
    dataLogin,
    handleChangeDataLogin,
    devices,
    selectedDevice,
    setSelectedDevice,
    onSendDevice,
    isError,
  };
};
export default useSmartOTP;
