import { K_BORDER_RADIUS_8, K_SIZE_12, K_SIZE_20, K_WINDOW_WIDTH, sizeScale } from '@common';
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
        section: {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: K_SIZE_20,
          borderRadius: K_BORDER_RADIUS_8,
          borderWidth: 0.5,
          borderColor: colors.color_300,
          // marginBottom: K_SIZE_20,
        },
        blocTitle: {
          marginBottom: K_SIZE_12,
        },
      }),
    [colors]
  );
};
