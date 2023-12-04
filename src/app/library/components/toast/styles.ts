import { K_SCREEN_WIDTH, K_SIZE_24 } from '@common';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useToastStyle = () => {
  // state
  const { colors } = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        wrapContainer: {
          flexDirection: 'row',
        },
        container: {
          paddingHorizontal: Space.spacing_m,
          paddingVertical: Space.spacing_xs,
          backgroundColor: `${colors.color_900}E6`,
          borderRadius: 100,
          alignItems: 'center',
        },
        wrapText: {
          maxWidth: K_SCREEN_WIDTH * 0.85 - K_SIZE_24 - Space.spacing_s,
        },
      }),
    [colors]
  );
};
