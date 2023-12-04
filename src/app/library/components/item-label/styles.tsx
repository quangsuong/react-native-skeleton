import { K_BORDER_WIDTH_1 } from '@common';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useItemLabelStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: Space.spacing_m,
          borderBottomWidth: K_BORDER_WIDTH_1,
          paddingHorizontal: Space.spacing_m,
        },
      }),
    [colors]
  );
};
