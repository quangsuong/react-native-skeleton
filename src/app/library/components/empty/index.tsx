import { K_PADDING_40, K_SIZE_20, K_SIZE_4, sizeScale } from '@common';
import { Block, Spacer, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import React, { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
interface TypeEmpty {
  type:
    | 'BILL'
    | 'CARD'
    | 'ERROR'
    | 'INTERNET'
    | 'CONTACT'
    | 'BANK'
    | 'USER'
    | 'TRANS'
    | 'LOCATION'
    | 'SERVICE';
}
interface EmptyComponentProps {
  loading?: boolean;
  t18nTitle?: I18nKeys;
  flex?: number;
  title1?: I18nKeys;
  typeEmpty: TypeEmpty['type'];
  containerStyle?: ViewStyle;
  keySearch?: string;
}

export default function EmptyComponent({
  loading,
  t18nTitle,
  flex,
  title1,
  typeEmpty,
  containerStyle,
  keySearch,
}: EmptyComponentProps) {
  const { colors } = useTheme();
  const styles = useStyles();
  const typeIcon = useMemo(
    () => ({
      BILL: 'EMPTY_BILL',
      CARD: 'EMPTY_CARD',
      ERROR: 'EMPTY_ERROR',
      INTERNET: 'EMPTY_INTERNET',
      CONTACT: 'EMPTY_CONTACT',
      BANK: 'EMPTY_BANK',
      USER: 'EMPTY_USER',
      TRANS: 'EMPTY_TRANS',
      LOCATION: 'EMPTY_LOCATION',
      SERVICE: 'EMPTY_SERVICE',
    }),
    []
  );
  if (loading) {
    return null;
  }
  return useMemo(() => {
    if (typeEmpty) {
      return (
        <Block style={[styles.boxNotFound, containerStyle]}>
          <IconSvgLocal name={typeIcon[typeEmpty]} />
          <Spacer height={Space.spacing_m} />
          {keySearch ? (
            <Block direction="row" alignItems="center">
              <Text t18n={t18nTitle} textAlign="center" preset="body3" color={colors.color_700} />
              <Spacer width={K_SIZE_4} />

              <Text textAlign="center" preset="body3" color={colors.color_700}>
                {keySearch?.length > 20 ? keySearch.substring(0, 20) + '...' : keySearch}
              </Text>
            </Block>
          ) : (
            <Text t18n={t18nTitle} textAlign="center" preset="body3" color={colors.color_700} />
          )}
          <Spacer height={Space.spacing_m} />
        </Block>
      );
    }
    return (
      <Block
        flex={flex?.toString() ? flex : 1}
        justifyContent="center"
        alignItems="center"
        marginTop={K_PADDING_40}
      >
        <IconSvgLocal name="NO_DATA" />
        <Spacer height={K_SIZE_20} />
        {title1 && (
          <Text
            color={colors.color_700}
            preset="subtitle1"
            t18n={title1}
            style={{ marginBottom: sizeScale(4) }}
          />
        )}

        <Text
          color={colors.color_600}
          preset="body3"
          textAlign="center"
          t18n={t18nTitle ?? 'text:no_beneficiary'}
        />
      </Block>
    );
  }, [colors]);
}
const useStyles = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        // eslint-disable-next-line react-native/no-unused-styles
        boxNotFound: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    []
  );
};
