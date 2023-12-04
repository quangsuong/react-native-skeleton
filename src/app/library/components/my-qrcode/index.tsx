import { formatCurrency, K_SIZE_10, K_SIZE_20, K_SIZE_40, K_SIZE_60, sizeScale } from '@common';
import { Block, LocalImage, SectionTrack, Text } from '@components';
import { Shadow } from '@components/shadow';
import { SkeletonWrap } from '@components/skeleton-wrap';
import { BorderRadius, Colors as ColorsLight, Space } from '@foundation';
import { useTheme } from '@theme';
import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { View, ViewStyle } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useMyQRCodeStyle } from './styles';

const logoSize = sizeScale(50);
export interface PropsBoxQr {
  name?: string;
  numberBankAccount?: string;
  mode?: 'transfer' | 'profile';
  containerStyle?: ViewStyle;
  accountName?: string;
  account_id?: string;
  amount?: string;
  transferNote?: string;
  qr?: string;
  loading?: boolean;
}

const Component = ({
  accountName,
  account_id,
  amount,
  transferNote,
  qr,
  containerStyle,
  loading,
}: PropsBoxQr) => {
  const [t] = useTranslation();
  const styles = useMyQRCodeStyle();
  const { colors } = useTheme();

  const qrPadding = sizeScale(10);

  const buttonSkeleton = useMemo(
    () => (
      <SkeletonWrap isLoading colors={ColorsLight}>
        <SkeletonPlaceholder.Item alignItems="center">
          <SkeletonPlaceholder.Item
            width={sizeScale(K_SIZE_40)}
            height={sizeScale(K_SIZE_40)}
            borderRadius={sizeScale(K_SIZE_20)}
            marginBottom={Space.spacing_xs}
          />
          <SkeletonPlaceholder.Item
            width={sizeScale(K_SIZE_60)}
            height={sizeScale(K_SIZE_10)}
            borderRadius={BorderRadius.border_radius_s}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonWrap>
    ),
    []
  );

  if (loading) {
    return (
      <Block flex={1} alignSelf="center">
        <Block style={[styles.container, styles.radius]} marginTop={sizeScale(50)}>
          <SkeletonWrap isLoading colors={ColorsLight}>
            <SkeletonPlaceholder.Item alignItems="center">
              <SkeletonPlaceholder.Item style={styles.viewHeader}>
                <SkeletonPlaceholder.Item
                  width={sizeScale(150)}
                  height={sizeScale(20)}
                  borderRadius={BorderRadius.border_radius_s}
                />
                <SkeletonPlaceholder.Item
                  width={sizeScale(150)}
                  height={sizeScale(10)}
                  marginTop={sizeScale(10)}
                  borderRadius={BorderRadius.border_radius_s}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item alignItems="center" paddingVertical={Space.spacing_l}>
                <SkeletonPlaceholder.Item
                  width={sizeScale(200)}
                  height={sizeScale(200)}
                  borderRadius={BorderRadius.border_radius_m}
                />
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item
                width={sizeScale(150)}
                height={sizeScale(15)}
                borderRadius={BorderRadius.border_radius_xs}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonWrap>
        </Block>
        <SkeletonWrap isLoading colors={ColorsLight}>
          <SkeletonPlaceholder.Item
            width={sizeScale(K_SIZE_60)}
            height={K_SIZE_10}
            borderRadius={BorderRadius.border_radius_s}
            alignSelf="center"
            marginTop={Space.spacing_4xl}
          />
        </SkeletonWrap>
        <SkeletonPlaceholder.Item flex={1} />
        <SkeletonPlaceholder.Item alignSelf="center" marginTop={sizeScale(40)}>
          <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between" width={320}>
            <Block />
            {buttonSkeleton}
            {buttonSkeleton}
            {buttonSkeleton}
            <Block />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </Block>
    );
  }

  return (
    <SectionTrack name={'BODY'}>
      <Block style={containerStyle}>
        <Shadow type={'down-m'} style={styles.radius}>
          <Block style={[styles.container, styles.radius, styles.borderWrapQR]} alignItems="center">
            <View style={styles.viewHeader}>
              <Text preset={'subtitle2'} color={colors.color_900}>
                {accountName?.toUpperCase?.()}
              </Text>
              <Text preset="body1" style={styles.accNo} color={colors.color_900}>
                {(account_id + '').toString().formatThousandNumber()}
              </Text>
            </View>
            <Block alignItems="center" justifyContent="center" paddingVertical={Space.spacing_s}>
              <Block
                padding={qrPadding}
                color={colors.color_1000}
                borderRadius={BorderRadius.border_radius_m}
              >
                <QRCode
                  value={qr || ','}
                  color={colors.color_0}
                  backgroundColor={colors.color_1000}
                  logoMargin={10}
                  size={sizeScale(180) - qrPadding}
                />
              </Block>
              <Block
                position="absolute"
                height={logoSize}
                width={logoSize}
                borderRadius={logoSize / 2}
                color={colors.color_50}
                alignItems="center"
                justifyContent="center"
              >
                <LocalImage source="logo_for_qr" style={styles.logo} resizeMode="contain" />
              </Block>
            </Block>
            <Block style={styles.viewLogoPartner}>
              <LocalImage source={'IC_QR_SUPPORT'} style={styles.qr_support} resizeMode="contain" />
            </Block>
            {amount ? (
              <>
                <Block height={Space.spacing_m} />
                <Text
                  text={formatCurrency(amount + '') + ' ₫'}
                  textAlign="center"
                  preset="title4"
                  color={colors.color_900}
                />
              </>
            ) : (
              <></>
            )}
            {transferNote ? (
              <>
                <Block height={Space.spacing_2xs} />
                <Text
                  text={transferNote}
                  textAlign="center"
                  numberOfLines={2}
                  preset="body1"
                  color={colors.color_900}
                />
              </>
            ) : (
              <></>
            )}
          </Block>
        </Shadow>
      </Block>
    </SectionTrack>
  );
};

export const MyQRCode = memo(Component, isEqual);
