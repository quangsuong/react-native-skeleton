import { K_SIZE_10, K_SIZE_16 } from '@common';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useHeaderStyle = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        badge: {
          position: 'absolute',
          top: K_SIZE_10,
          right: K_SIZE_16,
          alignItems: 'center',
        },
      }),
    []
  );
};
