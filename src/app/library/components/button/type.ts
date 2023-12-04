import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { Colors } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';

import { IconSvgTypes } from '@assets/icon';
import { CustomOmit } from '@common';
import { ButtonPresetNames } from './preset';

export interface ButtonProps extends TouchableOpacityProps, TouchableNativeFeedbackProps {
  /**
   * Text which is looked up via i18n.
   * @default undefined
   */
  t18n?: I18nKeys;

  /**
   * Using text instead i18n
   * @default undefined
   */
  text?: string;

  /**
   * Using icon for left button
   * @default undefined
   */
  icon?: IconSvgTypes;

  /**
   * Using color for icon
   * @default undefined
   */

  iconColor?: string;

  /**
   * Overwrite style for button
   * @default undefined
   */
  style?: StyleProp<CustomOmit<ViewStyle, 'margin' | 'marginTop' | 'flex'>>;

  /**
   * Overwrite style for text
   * @default undefined
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Preset for button
   * @default default
   */
  preset?: ButtonPresetNames;

  /**
   * Using color for text
   * @default undefined
   */
  textColor?: string;

  /**
   * Overwrite background color with theme for text
   */
  textColorTheme?: keyof Colors;

  /**
   * Using color for button background color
   * @default undefined
   */
  buttonColor?: string;

  /**
   * Overwrite button background with theme
   * @default undefined
   */
  buttonColorTheme?: keyof Colors;

  /**
   * Children for button
   * @default undefined
   */
  children?: React.ReactNode;

  /**
   * name for tracking action
   * @default undefined
   */
  name: string;

  /**
   * overwrite flex box
   */
  flex?: number;

  /**
   * center for center content
   * @default undefined
   */
  center?: boolean;

  /**
   * activeOpacity
   * @default 0.2
   */
  activeOpacity?: number;

  /**
   * type of button
   * @default default
   */
  type?: 'primary' | 'outline' | 'default' | undefined;

  /**
   * danh cho icon de tang hisSlop
   * @default false
   */
  forIcon?: boolean;
  /**
   * using marginTop for style
   * @default false
   */

  marginTop?: number;
  margin?: number;
  onPress: Function | undefined;

  iconColor1?: keyof Colors;
  iconColor2?: keyof Colors;
  iconColor3?: keyof Colors;

  // color for default not using useTheme()
  initColors?: keyof Colors;
}
