import {
  K_SIZE_24,
  K_SIZE_48,
  K_SIZE_SCALE_12,
  K_SIZE_SCALE_24,
  K_SIZE_SCALE_6,
  sizeScale,
} from '@common';
import { BorderRadius, Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const logoImgSize = sizeScale(32);

export const useMyQRCodeStyle = () => {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.color_50,
          // paddingHorizontal: K_SIZE_SCALE_38,
          padding: K_SIZE_SCALE_24,
          // paddingBottom: K_SIZE_SCALE_46,
        },
        radius: {
          borderRadius: BorderRadius.border_radius_xxxl,
          // overflow: 'hidden'
        },
        borderWrapQR: {
          borderColor: colors.border,
          borderWidth: 0,
        },
        viewHeader: {
          alignItems: 'center',
        },
        boxSpace: {
          borderWidth: 1,
          borderColor: colors.color_200,
          marginVertical: Space.spacing_s,
          marginHorizontal: 9.5,
        },
        viewLogoPartner: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // marginBottom: Space.spacing_xs
        },
        boxInfo: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        boxSelectTK: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: K_SIZE_SCALE_12,
          paddingVertical: K_SIZE_SCALE_6,
          backgroundColor: colors.color_200,
          borderWidth: 1,
          borderColor: colors.color_200,
          borderRadius: BorderRadius.border_radius_xxxl,
          marginTop: Space.spacing_xs,
          marginBottom: Space.spacing_2xs,
        },
        boxAddMoney: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: K_SIZE_SCALE_24,
        },
        shareText: {
          color: colors.color_900,
        },
        qrBtnWrap: {
          width: sizeScale(100),
          justifyContent: 'center',
          alignItems: 'center',
        },
        qrBtnBg: {},
        accNo: {
          marginTop: Space.spacing_2xs,
        },
        shadow: {
          borderRadius: K_SIZE_24,
          height: K_SIZE_48,
          width: K_SIZE_48,
          marginBottom: Space.spacing_xs,
          marginTop: Space.spacing_xs,
        },
        logo: {
          height: logoImgSize,
          width: logoImgSize,
        },
        qr_support: {
          height: sizeScale(32),
          width: sizeScale(146),
          marginBottom: -Space.spacing_xs,
        },
      }),
    [colors]
  );
};
