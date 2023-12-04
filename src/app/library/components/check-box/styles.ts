import { StyleSheet } from 'react-native';

import { BorderRadius } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
const DIMENSIONS = { width: 16, height: 16 };

export const useCheckBoxStyle = () => {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        root: {
          flexDirection: 'row',
          paddingVertical: 4,
          alignSelf: 'flex-start',
        },
        outline: {
          ...DIMENSIONS,
          marginTop: 2,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.color_500,
          borderRadius: BorderRadius.border_radius_s,
        },
        label: {
          marginLeft: 8,
          flex: 1,
          marginTop: -2,
        },
      }),
    [colors]
  );
};
