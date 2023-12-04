import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import isEqual from 'react-fast-compare';

import { Images } from '@assets/image';
import { sizeScale } from '@common';
import { Block } from '@components';
import { showAlert } from '@components/alert';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Language } from '@components/language';
import { selectAppConfig } from '@redux-selector/app';
import { useTheme } from '@theme';
import notificationHelper from '@utils/notification-helper';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { useStyle } from './styles';
interface HeaderProp {
  isKeyboardShow: boolean;
}

const Component = (props: HeaderProp) => {
  const { theme } = useSelector(selectAppConfig);
  const styles = useStyle(props.isKeyboardShow);
  const { colors } = useTheme();
  const [notifyCount, setNotifyCount] = useState<number>(0);
  const { t } = useTranslation();
  const getNotifcationCount = useCallback(async () => {
    const count = await notificationHelper.getBadgeCount();
    setNotifyCount(count ?? 0);
  }, []);

  useEffect(() => {
    getNotifcationCount();
  }, []);

  const goToNotificationScreen = useCallback(() => {
    // navigate(APP_SCREEN.SCREEN_NOTIFICATION)
    showAlert({
      title: t('alert:notify'),
      content: t('text:functions_in_development'),
      type: 'confirm',
      actions: [
        {
          title: t('text:close'),
        },
      ],
    });
  }, []);

  const logo = useMemo(() => {
    switch (theme) {
      case 'priority':
        return <IconSvgLocal name="IC_PRIORITY" height={sizeScale(37)} width={sizeScale(107)} />;
      default:
        return <Animated.Image source={Images.Logo_PVCB} style={styles.logo} />;
    }
  }, [theme, props.isKeyboardShow]);

  return (
    <>
      <Block style={styles.headerBox}>
        <Block style={styles.logo_layout}>{logo}</Block>
        <View style={styles.language}>
          <Language />
        </View>
      </Block>
    </>
  );
};
export const HeaderLogin = memo(Component, isEqual);
