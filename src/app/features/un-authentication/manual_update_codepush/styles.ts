import { K_FONT_SIZE_15, K_PADDING_12, K_PADDING_16, K_SIZE_10 } from '@common';
import { Typography } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyle = () => {
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        gradient: {
          flex: 1,
        },
        progressTxt: {
          ...Typography['subtitle4'],
          color: colors.color_800,
          lineHeight: K_FONT_SIZE_15,
          position: 'absolute',
        },
        container: {
          width: '100%',
          // height: 100, width: 100
        },
        txt_status: {
          flex: 1,
          marginLeft: K_SIZE_10,
        },
        action: {
          paddingHorizontal: K_PADDING_12,
        },
        collapsedBtn: {
          position: 'absolute',
          // right: 0,
          // top: sizeScale(100)
        },
        shadow_expanded: {
          marginHorizontal: K_PADDING_16,
        },
      }),
    [colors]
  );
};
