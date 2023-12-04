import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { K_PADDING_16 } from '../../constant';

export const useStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        txtTimer: {
          marginTop: K_PADDING_16,
        },
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [colors]
  );
};
