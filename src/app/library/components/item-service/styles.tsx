import { sizeScale } from '@common';
import { BorderRadius, Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useItemServiceStyle = () => {
  // state
  const theme = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingBottom: Space.spacing_m,
        },
        container_wrap: {
          flexDirection: 'row',
          borderRadius: BorderRadius.border_radius_l,
          backgroundColor: theme.colors.color_50,
          paddingTop: sizeScale(16),
          paddingBottom: sizeScale(24),
          paddingLeft: sizeScale(8),
          paddingRight: sizeScale(16),
        },
        icon_wrap: {
          width: sizeScale(56),
          height: sizeScale(56),
          borderRadius: sizeScale(56) / 2,
          backgroundColor: theme.colors.color_100,
          justifyContent: 'center',
          alignItems: 'center',
        },
        content_wrap: {
          flexShrink: 1,
        },
      }),
    [theme.colors]
  );
};
