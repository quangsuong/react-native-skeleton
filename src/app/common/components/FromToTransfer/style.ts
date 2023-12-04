import { K_BORDER_RADIUS_8, sizeScale } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const theme = useTheme();
  const { colors } = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        shadowSection: {
          padding: sizeScale(16),
          margin: sizeScale(16),
          borderRadius: K_BORDER_RADIUS_8,
          backgroundColor: colors.color_50,
        },
      }),
    [theme]
  );
};
