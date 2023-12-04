import { K_QR_SCAN_SIZE, K_QR_SCAN_X, K_QR_SCAN_Y } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useScanMaskStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        line: {
          position: 'absolute',
          top: K_QR_SCAN_Y + 2,
          left: K_QR_SCAN_X + 4,
          width: K_QR_SCAN_SIZE - 8,
          height: 1.5,
          backgroundColor: colors.color_primary_500,
        },
        spiner: {
          position: 'absolute',
          top: K_QR_SCAN_Y,
          left: K_QR_SCAN_X,
          width: K_QR_SCAN_SIZE,
          height: K_QR_SCAN_SIZE,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [colors]
  );
};
