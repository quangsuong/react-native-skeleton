import React, { memo } from 'react';
import isEqual from 'react-fast-compare';

import { Text } from '@components';
import useTimerTransfer from '@customHooks/useTimerTransfer';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import { useTranslation } from 'react-i18next';
import { useStyle } from './styles';

interface TimerTransactionProps {
  titleT18?: I18nKeys;
}

const Component = (props: TimerTransactionProps) => {
  const { time, minutes, second } = useTimerTransfer();
  const { t } = useTranslation();
  const styles = useStyle();
  const { colors } = useTheme();

  return (
    <Text center style={styles.txtTimer} color={colors.color_800} preset="subtitle4">
      {t(props?.titleT18 ?? 'text:OTP_code_will_expire_later')}{' '}
      <Text color={colors.color_secondary_500} text={`${minutes}:${second}`} preset="subtitle4" />
    </Text>
  );
};
export const TimerTransaction = memo(Component, isEqual);
