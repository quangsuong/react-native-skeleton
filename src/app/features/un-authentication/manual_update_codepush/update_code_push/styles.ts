import {
  K_FONT_SIZE_20,
  K_PADDING_10,
  K_PADDING_12,
  K_PADDING_16,
  K_PADDING_24,
  K_SCREEN_HEIGHT,
  K_SCREEN_WIDTH,
  sizeScale,
} from '@common';
import { BorderRadius, Typography } from '@foundation';
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
          ...Typography['title1'],
          color: colors.color_primary_300,
        },
        downloadBtn: {
          alignSelf: 'center',
          width: K_SCREEN_WIDTH - sizeScale(K_PADDING_24 * 2),
          flexDirection: 'row',
          marginBottom: sizeScale(50),
        },
        updateDetail: {
          height: sizeScale(262),
          marginHorizontal: K_PADDING_16,
          borderRadius: BorderRadius.border_radius_l,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.color_300,
        },
        head: {
          paddingHorizontal: K_PADDING_10,
          paddingVertical: K_PADDING_10,
          borderBottomWidth: 1,
          borderColor: colors.color_300,
          alignItems: 'center',
        },
        contentContainerStyleDesc: {
          paddingHorizontal: K_PADDING_12,
        },
        circleProgress: {
          transform: [
            {
              rotate: '-90deg',
            },
          ],
        },
        updateContent: {
          lineHeight: K_FONT_SIZE_20,
          paddingVertical: K_PADDING_16,
        },
        container: {
          // justifyContent: 'center',
          width: K_SCREEN_WIDTH,
          height: K_SCREEN_HEIGHT,
          paddingHorizontal: sizeScale(K_PADDING_24),
          bottom: 0,
        },
      }),
    [colors]
  );
};
