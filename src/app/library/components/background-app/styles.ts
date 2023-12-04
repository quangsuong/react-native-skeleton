import { K_SCREEN_HEIGHT, K_SCREEN_WIDTH, K_WINDOW_WIDTH } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useBackgroundStyle = () => {
  // state
  const aspectRatio = 375 / 820;
  const imageHeight = K_WINDOW_WIDTH / aspectRatio;

  const theme = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        backround: {
          position: 'absolute',
          width: K_WINDOW_WIDTH,
          zIndex: 0,
          height: imageHeight,
        },
        backround_linnear: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        },
        body: {
          flex: 1,
          zIndex: 9,
        },
        customBackground: {
          position: 'absolute',
          width: K_SCREEN_WIDTH,
          zIndex: 0,
          height: K_SCREEN_HEIGHT,
        },
        linearBlock: { flex: 1 },
      }),
    [theme.colors]
  );
};
