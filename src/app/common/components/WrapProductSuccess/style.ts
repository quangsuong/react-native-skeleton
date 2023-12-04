import { K_SIZE_SCALE_16 } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useTransferStyle = () => {
  const theme = useTheme();
  const { colors } = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: K_SIZE_SCALE_16,
        },
      }),
    [theme]
  );
};
