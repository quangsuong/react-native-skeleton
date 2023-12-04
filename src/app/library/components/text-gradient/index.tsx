import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import { useTranslation } from 'react-i18next';

import { propsToStyle, sizeScale } from '@common';
import { FontDefault } from '@theme/typography';

import { DirectType } from '@components/linear-view/type';
import { Colors, Typography } from '@foundation';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradientView } from '../linear-view';
import { Text } from '../text';
import { TextProps } from './type';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export const TextGradient = ({
  t18n,
  text,
  flex,
  colors = [Colors.gradient_primary_start, Colors.gradient_primary_end],
  locations = [0, 1],
  center,
  children,
  fontSize,
  textAlign,
  fontStyle,
  lineHeight,
  fontFamily,
  colorTheme,
  t18nOptions,
  textTransform,
  letterSpacing,
  preset = 'subtitle1',
  style: styleOverride = {},
  direct = DirectType.horizontal,
  ...rest
}: TextProps) => {
  // state
  const [t] = useTranslation();
  const i18nText = useMemo(() => t18n && t(t18n, t18nOptions), [t18n, t18nOptions, t]);

  const props = useMemo(() => {
    return { colors, locations };
  }, [colors, locations]);

  const content = useMemo(() => i18nText || text || children, [i18nText, text, children]);

  const styleComponent = useMemo<StyleProp<TextStyle>>(
    () => [
      [
        Typography[preset],
        flex === true && styles.flex,
        fontSize !== undefined && { fontSize: sizeScale(fontSize) },
        fontFamily !== undefined && { fontFamily: FontDefault[fontFamily] },
        center && { textAlign: 'center' },
        propsToStyle([
          { textAlign },
          { textTransform },
          { fontStyle },
          { letterSpacing },
          { lineHeight },
        ]),
      ],
    ],
    [
      preset,
      flex,
      fontSize,
      fontFamily,
      colorTheme,
      center,
      textAlign,
      textTransform,
      fontStyle,
      letterSpacing,
      lineHeight,
    ]
  );
  // render

  return (
    <MaskedView
      maskElement={
        <Text {...rest} {...props} style={[styleComponent, styleOverride]}>
          {content}
        </Text>
      }
    >
      <LinearGradientView {...props} direct={direct}>
        <Text {...rest} {...props} style={[styleComponent, styleOverride, { opacity: 0 }]}>
          {content}
        </Text>
      </LinearGradientView>
    </MaskedView>
  );
};
