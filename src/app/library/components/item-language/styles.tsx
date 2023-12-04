import { K_BORDER_WIDTH_1, sizeScale } from '@common';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useItemLanguageStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          paddingVertical: sizeScale(Space.spacing_m),
          alignItems: 'center',
          borderBottomWidth: K_BORDER_WIDTH_1,
          paddingHorizontal: Space.spacing_m,
        },
      }),
    [colors]
  );
};
