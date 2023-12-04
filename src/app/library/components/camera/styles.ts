import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Props } from './type';

export const useStyle = (props: Props) => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {},
      }),
    [colors]
  );
};
