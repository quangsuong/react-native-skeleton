import { K_BORDER_WIDTH_1 } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useAccessoryStyle = () => {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        accessory: {
          position: 'absolute',
          right: 0,
          left: 0,
          backgroundColor: colors.transparent,
        },
        accessoryBorder: {
          borderTopWidth: K_BORDER_WIDTH_1,
          borderTopColor: 'rgba(0,0,0,0.1)',
        },
      }),
    []
  );
};
