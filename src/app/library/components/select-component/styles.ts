import { K_BORDER_RADIUS_8, K_SIZE_12, K_SIZE_20 } from '@common';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyle = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: K_SIZE_12,
          borderRadius: K_BORDER_RADIUS_8,
          borderWidth: 0.5,
          borderColor: colors.color_300,
          paddingVertical: Space.spacing_s,
          marginBottom: K_SIZE_20,
        },
      }),
    [colors]
  );
};
