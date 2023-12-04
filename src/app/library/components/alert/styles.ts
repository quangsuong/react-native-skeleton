import { K_ALERT_MAX_WIDTH, K_BORDER_WIDTH_1, K_PADDING_16, K_SIZE_44 } from '@common';
import { BorderRadius, Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useAlertViewStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        alert_wrap: {
          width: K_ALERT_MAX_WIDTH,
          maxWidth: K_ALERT_MAX_WIDTH,
          // minHeight: K_ALERT_MIN_HEIGHT,
          backgroundColor: colors.color_50,
          marginHorizontal: Space.spacing_m,
          borderRadius: BorderRadius.border_radius_l,
          alignItems: 'center',
          overflow: 'hidden',
        },
        full: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        btn_wrap: {
          height: K_SIZE_44,
          overflow: 'hidden',
          backgroundColor: 'transparent',
          borderRadius: BorderRadius.border_radius_m,
        },
        btn_secondary: {
          flex: 1,
          borderRadius: BorderRadius.border_radius_m,
          borderWidth: K_BORDER_WIDTH_1,
          borderColor: colors.color_500,
          height: K_SIZE_44,
          justifyContent: 'center',
          alignItems: 'center',
        },
        btn_primary: {
          flex: 1,
          borderRadius: BorderRadius.border_radius_m,
          // backgroundColor: colors.color_primary_500,
          height: K_SIZE_44,
          justifyContent: 'center',
          alignItems: 'center',
        },
        btn_link: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        noBackground: {
          backgroundColor: 'transparent',
        },
        btn_close: {
          alignSelf: 'flex-end',
          padding: K_PADDING_16,
          position: 'absolute',
        },
      }),
    [colors]
  );
};
