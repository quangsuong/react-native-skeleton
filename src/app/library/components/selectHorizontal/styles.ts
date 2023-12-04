import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.color_50,
          paddingHorizontal: Space.spacing_m,
          paddingTop: Space.spacing_xs,
          paddingBottom: Space.spacing_m,
        },
        itemOptionSearch: {
          backgroundColor: 'white',
          borderRadius: 24,
          paddingHorizontal: Space.spacing_s,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: colors.color_300,
          marginRight: Space.spacing_s,
        },
      }),
    [colors]
  );
};
