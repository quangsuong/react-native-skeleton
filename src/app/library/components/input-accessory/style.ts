import { K_BORDER_RADIUS_6, K_SIZE_6, K_SIZE_85 } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyle = () => {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        root: {
          justifyContent: 'center',
          backgroundColor: colors.color_400,
        },
        button: {
          width: K_SIZE_85,
          alignItems: 'center',
          paddingVertical: K_SIZE_6,
          borderRadius: K_BORDER_RADIUS_6,
          backgroundColor: colors.color_50,
        },
      }),
    []
  );
};
