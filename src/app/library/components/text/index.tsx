import React, { useMemo } from 'react';
//@ts-ignore
import { K_IS_IOS, propsToStyle, sizeScale } from '@common';
import { Typography } from '@foundation';
import { useTheme } from '@theme';
import { Utils } from '@utils/utils';
import { useTranslation } from 'react-i18next';
import { StyleProp, StyleSheet, Text as RNText, TextStyle } from 'react-native';
import { TextProps } from './type';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export const Text = ({
  t18n,
  text,
  flex,
  color,
  center,
  children,
  fontSize,
  textAlign,
  fontStyle,
  lineHeight,
  fontFamily,
  colorTheme = 'color_900',
  t18nOptions,
  textTransform,
  letterSpacing,
  preset = 'subtitle1',
  style: styleOverride = {},
  textDecorationLine,
  ...rest
}: TextProps) => {
  // state
  const theme = useTheme();
  const [t] = useTranslation();
  const i18nText = useMemo(() => t18n && t(t18n, t18nOptions), [t18n, t18nOptions, t]);
  const content = useMemo(() => i18nText || text || children, [i18nText, text, children]);

  const styleComponent = useMemo<StyleProp<TextStyle>>(
    () => [
      [
        Typography[preset],
        flex === true && styles.flex,
        fontSize !== undefined && { fontSize: sizeScale(fontSize) },
        colorTheme !== undefined && { color: theme.colors[colorTheme] },
        center && { textAlign: 'center' },
        propsToStyle([
          { color },
          { textAlign },
          { textTransform },
          { fontStyle },
          { letterSpacing },
          { lineHeight },
          { textDecorationLine },
        ]),
      ],
    ],
    [
      preset,
      flex,
      fontSize,
      fontFamily,
      colorTheme,
      theme.colors,
      center,
      color,
      textAlign,
      textTransform,
      fontStyle,
      letterSpacing,
      lineHeight,
    ]
  );

  const _calFont = useMemo(() => {
    if (K_IS_IOS) {
      return {};
    }
    return {
      fontFamily: Utils.getFontFamily(Typography[preset].fontWeight),
    };
  }, []);
  // render
  return (
    <RNText
      allowFontScaling={false}
      {...rest}
      style={StyleSheet.flatten([styleComponent, styleOverride, _calFont])}
    >
      {content}
    </RNText>
  );
};
