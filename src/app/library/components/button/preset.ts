import { K_SIZE_44 } from '@common';
import { BorderRadius, BorderWeight, Typography } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useButtonStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        primary: {
          borderRadius: BorderRadius.border_radius_m,
          height: K_SIZE_44,
        },
        outline: {
          borderRadius: BorderRadius.border_radius_m,
          borderWidth: BorderWeight.border_weight_m,
          borderColor: colors.color_500,
          height: K_SIZE_44,
        },
        default: {},
      }),
    [colors]
  );
};

export type ButtonPresetNames = keyof typeof Typography;
