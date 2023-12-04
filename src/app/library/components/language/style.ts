import { K_BORDER_RADIUS_8, K_MARGIN_4, K_PADDING_4 } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
export const useLanguageStyle = () => {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.color_primary_100,
          borderRadius: K_BORDER_RADIUS_8,
          padding: K_PADDING_4,
          flex: 1,
          alignItems: 'center',
        },
        text: {
          color: colors.color_800,
          marginStart: K_MARGIN_4,
          textAlign: 'center',
        },
      }),
    [colors]
  );
};
