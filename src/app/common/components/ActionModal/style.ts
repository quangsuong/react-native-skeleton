import { K_BORDER_WIDTH_1, K_WINDOW_WIDTH, sizeScale } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useTransferStyle = () => {
  const theme = useTheme();
  const { colors } = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        contentModal: {
          marginHorizontal: 0,
          width: K_WINDOW_WIDTH,
        },
        modalContainer: { backgroundColor: colors.transparent },
        btn: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: sizeScale(20),
        },
        border: {
          borderBottomWidth: K_BORDER_WIDTH_1,
          borderBottomColor: colors.color_300,
        },
      }),
    [theme]
  );
};
