import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useBioMetricUIStyle = () => {
  // state
  const theme = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        button: {
          margin: Space.spacing_m,
        },
        text_content: { marginTop: Space.spacing_m },
      }),
    [theme.colors]
  );
};
