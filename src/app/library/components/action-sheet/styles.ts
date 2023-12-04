import { StyleSheet } from 'react-native';

import { K_FONT_SIZE_15 } from '@common';
import { Colors, Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';

export default function useActionSheetStyle() {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        modal: {
          margin: 0,
          justifyContent: 'flex-end',
        },
        wrap: {
          position: 'absolute',
          bottom: 16,
          width: '100%',
          paddingBottom: 20,
          paddingHorizontal: Space.spacing_m,
          paddingVertical: 8,
        },
        backDrop: {
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 998,
        },
        wrapOption: {
          backgroundColor: colors.color_50,
          borderRadius: 10,
          overflow: 'hidden',
          paddingVertical: 8,
        },
        wrapCancel: {
          backgroundColor: colors.color_50,
          borderRadius: 10,
          overflow: 'hidden',
          marginTop: Space.spacing_m,
        },
        textCancel: {},
        wrapTitle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        },
        title: {
          fontSize: K_FONT_SIZE_15,
          alignSelf: 'center',
        },
        wrapTextCancel: {
          paddingVertical: Space.spacing_m,
          alignItems: 'center',
        },
        wrapTextOption: {
          paddingVertical: Space.spacing_m,
          alignItems: 'center',
          borderBottomColor: colors.color_200,
        },
        destructive: {
          color: Colors.color_error_500,
        },
        textDefault: {
          color: colors.color_900,
        },
      }),
    []
  );
}
