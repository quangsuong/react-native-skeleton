import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        btnGradient: {
          height: '100%',
          width: '100%',
          position: 'absolute',
        },
      }),
    [colors]
  );
};
