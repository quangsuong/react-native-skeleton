import { K_QR_SCAN_SIZE, K_QR_SCAN_X } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

interface ScanMaskStyleProps {
  scan_y: number;
}

export const useScanMaskStyle = (props: ScanMaskStyleProps) => {
  const { scan_y } = props;
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        line: {
          position: 'absolute',
          top: scan_y + K_QR_SCAN_SIZE - 4,
          left: K_QR_SCAN_X + 4,
          width: K_QR_SCAN_SIZE - 6,
          height: 1.5,
          backgroundColor: colors.color_primary_500,
        },
        spiner: {
          position: 'absolute',
          top: scan_y,
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
