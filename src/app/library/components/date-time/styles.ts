import {
  K_BORDER_RADIUS_20,
  K_SIZE_16,
  K_SIZE_20,
  K_SIZE_4,
  K_SIZE_48,
  K_SIZE_6,
  K_SIZE_8,
  K_SIZE_SCALE_44,
  sizeScale,
} from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useDateTimeStyle = () => {
  const { colors } = useTheme();
  const theme = useTheme();
  const isDarkmode = theme.dark;
  return useMemo(
    () =>
      StyleSheet.create({
        itemBtn: {
          alignItems: 'flex-end',
          paddingRight: K_SIZE_16,
          paddingVertical: K_SIZE_20,
        },
        backdrop: {
          backgroundColor: colors.transparent,
          zIndex: -88,
        },
        defaultHeader: {
          backgroundColor: colors.color_300,
          height: K_SIZE_6,
          width: K_SIZE_48,
          alignSelf: 'center',
          borderRadius: K_BORDER_RADIUS_20,
          marginTop: K_SIZE_16,
        },
        bg_sheet: {
          backgroundColor: colors.color_100,
        },
        itemSeparatorComponent: {
          borderBottomWidth: 0.5,
          borderBottomColor: colors.color_400,
          backgroundColor: colors.color_100,
        },
        fieldName: {
          marginBottom: K_SIZE_4,
        },
        containInput: {
          borderWidth: 1,
          borderRadius: K_SIZE_8,
          borderColor: colors.color_300,
          flexDirection: 'row',
          overflow: 'hidden',
          paddingHorizontal: sizeScale(10),
          justifyContent: 'space-between',
        },
        inputMask: {
          height: K_SIZE_SCALE_44,
          padding: sizeScale(6),
          color: colors.color_800,
        },
      }),
    []
  );
};
