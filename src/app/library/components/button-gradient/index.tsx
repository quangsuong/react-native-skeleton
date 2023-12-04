import { Button } from '@components/button';
import { LinearGradientView } from '@components/linear-view';
import { useTheme } from '@theme';
import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ButtonGradientProps } from './type';

export const ButtonGradient = (props: ButtonGradientProps) => {
  // state
  const {
    text,
    t18n,
    children,
    textColor,
    textColorTheme,
    buttonColorTheme,
    style = {},
    textStyle = {},
    preset = 'default',
    center,
    onPress,
    ...rest
  } = props;

  const { colors } = useTheme();

  const viewStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      style,
      center
        ? {
            alignItems: 'center',
            justifyContent: 'center',
          }
        : {},
    ],
    [style, center]
  );

  // render
  return (
    <LinearGradientView
      style={viewStyle}
      colors={[colors.gradient_start, colors.gradient_end]}
      locations={[0, 1]}
      direct={'horizontal'}
    >
      <Button name="press" {...props} {...rest} center />
    </LinearGradientView>
  );
};
