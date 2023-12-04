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
        badge: {
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 100,
        },
      }),
    [colors]
  );
};
