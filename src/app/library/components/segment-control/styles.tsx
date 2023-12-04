import { BorderRadius } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useSegmentControlStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        defaultSegmentedControlWrapper: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: BorderRadius.border_radius_l,
          backgroundColor: colors.color_200,
        },
        touchableContainer: {
          flex: 1,
          elevation: 9,
          paddingVertical: 12,
        },
        textWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        movingSegmentStyle: {
          marginVertical: 4,
          marginHorizontal: 4,
          borderRadius: 10,
          backgroundColor: colors.color_50,
        },
        // Badge Styles
        defaultBadgeContainerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          height: 16,
          width: 16,
          borderRadius: 9999,
          alignContent: 'flex-end',
        },
      }),
    [colors]
  );
};
