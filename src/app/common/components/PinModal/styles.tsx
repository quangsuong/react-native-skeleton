import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import {
  BASE_THEME,
  K_SCREEN_WIDTH,
  K_SIZE_40,
  K_SIZE_SCALE_24,
  K_SIZE_SCALE_32,
  sizeScale,
} from '@common';
import { BorderRadius, Space } from '@foundation';
import { useTheme } from '@theme';

export const useStyle = () => {
  // state
  const { colors } = useTheme();
  const widthAvatar = 96;
  const borderWidthAvatar = 12;
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        text: {
          color: colors.text,
        },
        headerBox: {
          marginHorizontal: Space.spacing_m,
          marginTop: Space.spacing_xs,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        container: {
          ...BASE_THEME.boxShadown,
          borderRadius: BorderRadius.border_radius_xxl,
          backgroundColor: colors.color_50,
          marginHorizontal: Space.spacing_m,
          padding: Space.spacing_xl,
        },
        boxText: {
          marginBottom: sizeScale(16),
        },
        boxListAction: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          flexWrap: 'wrap',
          marginHorizontal: Space.spacing_m,
        },
        actionItem: {
          alignItems: 'center',
          width: (K_SCREEN_WIDTH - Space.spacing_m * 2) / 3,
          marginBottom: Space.spacing_m,
          paddingVertical: Space.spacing_xs,
        },
        boxIcon: {
          width: K_SIZE_SCALE_24,
          height: K_SIZE_SCALE_24,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: sizeScale(4),
        },
        boxAvatar: {
          width: widthAvatar - borderWidthAvatar,
        },
        wrapBoxAvatar: {
          position: 'absolute',
          backgroundColor: 'white',
          width: widthAvatar - 6,
          height: widthAvatar - 6,
          borderRadius: widthAvatar - 6,
          justifyContent: 'center',
          alignItems: 'center',
          top: -widthAvatar / 2,
          left: (K_SCREEN_WIDTH - widthAvatar - Space.spacing_m * 2) / 2,
        },
        boxButtonPin: {
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: sizeScale(48),
          marginBottom: sizeScale(48),
        },
        boxPinCode: {
          flexGrow: 1,
          justifyContent: 'space-between',
        },
        containerPinCode: {
          height: '100%',
          backgroundColor: colors.color_50,
        },
        bottomSheet: {
          marginHorizontal: 0,
        },
        ic_left: {
          marginLeft: Space.spacing_s,
        },
        textInput: {
          paddingLeft: K_SIZE_40,
        },
        title: { marginBottom: K_SIZE_SCALE_32 },
        txtLoginPass: { marginLeft: 4 },
      }),
    [colors]
  );
};
