import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export default function useStyles() {
  const { colors } = useTheme();

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
}
