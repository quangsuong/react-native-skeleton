import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { sizeScale } from '@common';
import { Block, Text } from '@components';
import { useTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import { K_BORDER_RADIUS_4 } from '../../constant';
import { useStyle } from './styles';

export interface TransStatusBlockProps {
  status: string;
}

const Component = ({ status }: TransStatusBlockProps) => {
  const { t } = useTranslation();
  const styles = useStyle();
  const { colors } = useTheme();

  const configStatus = useMemo(() => {
    return {
      approved: {
        bg: colors.color_success_50,
        text: colors.color_success_600,
      },
      needAddProfile: {
        bg: colors.color_link_50,
        text: colors.color_link_600,
      },
      stt_pending: {
        bg: colors.color_pending_50,
        text: colors.color_pending_600,
      },
      rejected: {
        bg: colors.color_error_50,
        text: colors.color_error_600,
      },
    };
  }, [colors]);

  return (
    <Block
      borderRadius={K_BORDER_RADIUS_4}
      color={configStatus?.[status]?.bg ?? colors.color_success_50}
      alignItems="center"
      justifyContent="center"
      paddingHorizontal={sizeScale(8)}
    >
      <Text preset="caption3" color={configStatus?.[status]?.text ?? colors.color_success_500}>
        {t('text:' + status)}
      </Text>
    </Block>
  );
};
export const TransStatusBlock = memo(Component, isEqual);
