import { K_SIZE_50, K_SIZE_70 } from '@common';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useSuggestionViewStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        full: {
          ...StyleSheet.absoluteFillObject,
        },
        animation: {
          width: K_SIZE_50,
          height: K_SIZE_50,
        },
        animation_touch: {
          width: K_SIZE_70,
          height: K_SIZE_70,
          marginLeft: Space.spacing_xs,
        },
        button_wrap: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
      }),
    [colors]
  );
};
