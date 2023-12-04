import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { K_SIZE_SCALE_44 } from '../../constant';

export const useStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        wrapItem: {
          height: K_SIZE_SCALE_44,
        },
      }),
    [colors]
  );
};
