import { K_WINDOW_WIDTH, sizeScale } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyle = () => {
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        listContainer: { paddingBottom: sizeScale(50) },
        contentModal: {
          marginHorizontal: 0,
          width: K_WINDOW_WIDTH,
        },
        modalContainer: { backgroundColor: colors.transparent },
        item: {
          borderBottomWidth: 1,
          borderColor: colors.color_200,
          // paddingTop: sizeScale(16),
          marginHorizontal: sizeScale(16),
        },
      }),
    [colors]
  );
};
