import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyle = () => {
  // state
  const { colors } = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        circleStyle: {
          width: 24,
          height: 24,
          borderRadius: 24,
          justifyContent: 'center',
          alignItems: 'center',
        },
        containerStyle: {
          width: 70,
          height: 32,
          paddingHorizontal: 4,
          borderRadius: 36.5,
          justifyContent: 'center',
          backgroundColor: colors.color_primary_50,
          marginLeft: 20,
        },
        shadowValue: {
          shadowColor: colors.color_shadow,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        },
        flag: {
          width: 24,
          height: 24,
        },
        txt_wrap: {
          ...StyleSheet.absoluteFillObject,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: Space.spacing_s,
        },
        txt: {
          color: '#434657',
        },
      }),
    [colors]
  );
};
