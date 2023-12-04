import { K_SIZE_SCALE_40 } from '@common';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { AvatarProps } from './type';

export const useAvatarStyle = (props: AvatarProps) => {
  // state
  const { colors } = useTheme();
  const { size } = props;
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: size || K_SIZE_SCALE_40,
          height: size || K_SIZE_SCALE_40,
          borderRadius: (size || K_SIZE_SCALE_40) / 2,
          backgroundColor: colors.color_200,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.color_1000,
          borderWidth: 1,
          overflow: 'hidden',
        },
      }),
    [colors]
  );
};
