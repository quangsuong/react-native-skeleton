import {
  K_MARGIN_16,
  K_MARGIN_60,
  K_SCREEN_WIDTH,
  K_SIZE_32,
  K_SIZE_50,
  K_SIZE_SCALE_108,
  K_SIZE_SCALE_50,
  K_SIZE_SCALE_60,
  K_SIZE_SCALE_88,
} from '@common';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyle = (isKeyboardShow: boolean) => {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        headerBox: {
          paddingHorizontal: Space.spacing_m,
          marginTop: isKeyboardShow ? K_SIZE_50 : K_MARGIN_60,
          flexDirection: isKeyboardShow ? 'row' : 'column-reverse',
          width: K_SCREEN_WIDTH,
        },
        logo: {
          width: isKeyboardShow ? K_SIZE_SCALE_88 : K_SIZE_SCALE_108,
          height: isKeyboardShow ? K_SIZE_SCALE_50 : K_SIZE_SCALE_60,
        },
        logo_layout: {
          marginTop: isKeyboardShow ? 0 : K_MARGIN_16,
          alignItems: 'center',
          justifyContent: 'center',
        },
        language: {
          height: K_SIZE_32,
          flexGrow: isKeyboardShow ? 1 : 0,
          alignItems: 'flex-end',
        },
      }),
    [colors, isKeyboardShow]
  );
};
