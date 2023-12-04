import { K_SIZE_20, K_SIZE_8, propsToStyle } from '@common';
import { Block } from '@components/block';
import { IconSvgLocal } from '@components/icon-vec-local';
import useTracking from '@customHooks/useButton';
import { Space, Typography } from '@foundation';
import { useTheme } from '@theme';
import { debounce } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Text } from '../text';
import { useButtonStyle } from './preset';
import useStyles from './styles';
import { ButtonProps } from './type';
import { LinearBtnPriority } from "../../../common/components/LinearBtnPriority";

export const Button = (props: ButtonProps) => {
  const { name } = props;
  const { onPressTracking, showFeatureDeveloping } = useTracking({
    ...props,
    action: name,
  });
  // state
  const {
    flex,
    text,
    icon,
    iconColor,
    t18n,
    children,
    textColor,
    buttonColor,
    textColorTheme,
    buttonColorTheme,
    style: styleOverride = {},
    textStyle: textStyleOverride = {},
    preset = 'subtitle2',
    type: typePreset,
    disabled,
    onPress,
    center,
    activeOpacity,
    forIcon = false,
    marginTop,
    iconColor1,
    iconColor2,
    iconColor3,
    initColors,
    ...rest
  } = props;

  const { colors: _colors } = useTheme();

  const colors = useMemo(() => initColors ?? _colors, [_colors, initColors]);

  const stylesView = useButtonStyle();
  const styles = useStyles();
  // style
  const viewStyle = useMemo<StyleProp<ViewStyle>>(() => {
    let backgroundColor = buttonColorTheme ? colors[buttonColorTheme] : buttonColor;
    let borderColor = '';
    if (disabled) {
      if (typePreset === 'primary') {
        backgroundColor = colors.color_400;
      } else {
        backgroundColor = 'transparent';
        borderColor = colors.color_400;
      }
    } else if (!backgroundColor) {
      if (typePreset === 'primary') {
        backgroundColor = colors.color_primary_500;
      }
    }
    return [
      borderColor ? { borderColor } : {},
      {
        backgroundColor,
      },
      center
        ? {
            alignItems: 'center',
            justifyContent: 'center',
          }
        : {},
      propsToStyle([{ flex }]),
    ];
  }, [buttonColor, buttonColorTheme, colors, center, typePreset, disabled]);

  // text style
  const _calTextStyle = useMemo<StyleProp<TextStyle>>(() => {
    return [
      textStyleOverride,
      disabled
        ? { color: colors.color_600, alignSelf: 'center' }
        : { alignSelf: 'center', color: textColor },
    ];
  }, [textStyleOverride, disabled]);

  const _onTap = useCallback(
    debounce(
      (event: GestureResponderEvent) => {
        if (onPress && typeof onPress === 'function') {
          onPress(event);
        } else {
          showFeatureDeveloping();
        }
        onPressTracking();
      },
      1000,
      { leading: true, trailing: false }
    ),
    [onPress]
  );

  const _calStylesText = useMemo(() => {
    return Typography[preset];
  }, [preset]);

  const _calStylesView = useMemo(() => {
    return stylesView[typePreset || 'default'];
  }, [typePreset]);

  const _renderIcon = useCallback(() => {
    if (!icon) return null;
    return (
      <Block marginRight={Space.spacing_xs}>
        <IconSvgLocal
          name={icon}
          width={K_SIZE_20}
          height={K_SIZE_20}
          color={iconColor || iconColor1 || colors['text_title']}
          color2={iconColor2}
        />
      </Block>
    );
  }, [icon, iconColor]);

  const _textColorTheme = useMemo(() => {
    typePreset === 'primary' ? 'text_btn_primary' : textColorTheme;
  }, [typePreset]);

  // render
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={activeOpacity || 0.2}
      hitSlop={
        forIcon
          ? {
              top: K_SIZE_8,
              bottom: K_SIZE_8,
              left: K_SIZE_8,
              right: K_SIZE_8,
            }
          : {}
      }
      style={[_calStylesView, viewStyle, styleOverride, { marginTop, overflow: 'hidden' }]}
      {...rest}
      onPress={_onTap}
    >
      <LinearBtnPriority type={!disabled && typePreset} initColors={initColors} />
      {children || (
        <Block direction={'row'}>
          {_renderIcon()}
          <Text
            t18n={t18n}
            text={text}
            style={[_calTextStyle]}
            color={textColor}
            colorTheme={_textColorTheme}
            preset={preset}
          />
        </Block>
      )}
    </TouchableOpacity>
  );
};
