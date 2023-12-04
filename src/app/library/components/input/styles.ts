import { isIos, K_SIZE_4, K_SIZE_8, K_SIZE_SCALE_16, K_SIZE_SCALE_44, sizeScale } from '@common';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {},
        containerInput: {
          height: K_SIZE_SCALE_44,
          paddingLeft: isIos ? sizeScale(0) : sizeScale(4),
        },
        input: {
          height: K_SIZE_SCALE_44,
          color: colors.color_800,
        },
        button: {
          margin: K_SIZE_SCALE_16,
        },
        inputMask: {
          borderWidth: 1,
          borderRadius: K_SIZE_8,
          borderColor: colors.color_300,
          height: K_SIZE_SCALE_44,
          padding: sizeScale(10),
          marginBottom: K_SIZE_4,
          color: colors.color_800,
        },
        title: {
          marginBottom: Space.spacing_2xs,
        },

        labelTitle: {
          paddingBottom: Space.spacing_l,
        },
        subLabel: {
          paddingTop: Space.spacing_xs,
        },
        focus: {
          borderColor: colors.border,
        },
        disallowEdit: { backgroundColor: colors.color_200 },
        defaultRight: {
          marginRight: sizeScale(12),
          padding: sizeScale(3),
        },
        defaultClearStyle: {
          right: sizeScale(8),
          padding: sizeScale(3),
          position: 'absolute',
          top: sizeScale(9),
        },
        defaultLblErr: { marginTop: sizeScale(5) },
      }),
    [colors]
  );
};
