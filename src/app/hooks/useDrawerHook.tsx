import { logout } from '@common';
import { showAlert } from '@components/alert';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {}
const useDrawerHook = (props: Props) => {
  const [t] = useTranslation();

  const onSetting = useCallback(() => {
    closeDrawer();
    navigate(APP_SCREEN.SETTINGS);
  }, []);
  const onGuid = useCallback(() => {
    closeDrawer();
  }, []);
  const onQA = useCallback(() => {
    closeDrawer();
  }, []);
  const onChangePassword = useCallback(() => {
    closeDrawer();
  }, []);
  const onChangeLanguage = useCallback(() => {
    closeDrawer();
  }, []);
  const onLogout = useCallback(() => {
    closeDrawer();
    showAlert({
      title: t('text:logout'),
      content: t('alert:logout_confirm'),
      type: 'confirm',
      actions: [
        {
          title: t('alert:close'),
          type: 'secondary',
        },
        {
          title: t('text:logout'),
          type: 'primary',
          onPress: () => logout(),
        },
      ],
    });
  }, []);

  const closeDrawer = useCallback(() => {
    if (
      props.navigation &&
      props.navigation.closeDrawer &&
      typeof props.navigation.closeDrawer === 'function'
    ) {
      props.navigation.closeDrawer();
    }
  }, []);

  return {
    onSetting,
    onGuid,
    onQA,
    onChangePassword,
    onChangeLanguage,
    onLogout,
  };
};

export default useDrawerHook;
