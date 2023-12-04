import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { K_SIZE_10, sizeScale } from '@common';
import { useTheme } from '@theme';

export const useStyles = () => {
  // state
  const theme = useTheme();
  const { colors } = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        clearBtn: {
          position: 'absolute',
          zIndex: 1000,
          right: sizeScale(4),
          padding: K_SIZE_10,
        },
        focusContainerStyle: {
          backgroundColor: colors.color_50,
        },
      }),
    [theme]
  );
};
