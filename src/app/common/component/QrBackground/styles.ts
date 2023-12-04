import { K_SCREEN_WIDTH, sizeScale } from '@common';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyle = ({ colors }) => {
  // const { colors } = useTheme()
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        linear: {
          justifyContent: 'center',
          zIndex: -1,
        },
        wave: {
          marginLeft: -K_SCREEN_WIDTH * 0.15,
          marginBottom: sizeScale(150),
        },
      }),
    [colors]
  );
};
