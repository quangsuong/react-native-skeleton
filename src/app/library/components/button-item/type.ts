import { IconSvgTypes } from '@assets/icon';
import { TextPresetNames } from '@components/text/preset';
import { I18nKeys } from '@utils/i18n/locales';
import { ReactNode } from 'react';
import { ImageRequireSource, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Source } from 'react-native-fast-image';
//extends ButtonProps
export interface ButtonItemProps {
  /**
   * Using image icon for left button
   * @default undefined
   */
  leftImage?: Source | ImageRequireSource;

  /**
   * Using svg icon for left button
   * @default undefined
   */
  leftIcon?: IconSvgTypes;

  /**
   * Left icon width
   * @default undefined
   */
  leftIconWidth?: number;

  /**
   * Left icon height
   * @default undefined
   */
  leftIconHeight?: number;

  /**
   * Custom left component
   * @default undefined
   */
  leftComponent?: ReactNode;

  /**
   * Using color for left icon
   * @default undefined
   */
  leftIconColor?: string;

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
   * Using color for text
   * @default undefined
   */
  textColor?: string;

  /**
   * Overwrite style for text
   * @default undefined
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Preset for text
   * @default default
   */
  preset?: TextPresetNames;

  /**
   * Custom center component
   * @default undefined
   */
  centerComponent?: ReactNode;

  /**
   * Using image icon for right button
   * @default undefined
   */
  rightImage?: Source | ImageRequireSource;

  /**
   * Using svg icon for right button
   * @default undefined
   */
  rightIcon?: IconSvgTypes;

  /**
   * Custom right component
   * @default undefined
   */
  rightComponent?: ReactNode;

  /**
   * Svg right icon height
   * @default undefined
   */
  rightIconWidth?: number;

  /**
   * Svg right icon height
   * @default undefined
   */
  rightIconHeight?: number;

  /**
   * Svg right icon color
   * @default undefined
   */
  rightIconColor?: string;

  /**
   * Container padding
   * @default undefined
   */
  padding?: number;

  /**
   * Margin between text and left icon
   * @default undefined
   */
  marginLeftIcon?: number;

  /**
   * Margin between text and right icon
   * @default undefined
   */
  marginRightIcon?: number;

  /**
   * Overwrite style for button
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Using color for button background color
   * @default undefined
   */
  activeTintColor?: string;

  /**
   * Button focus
   * @default undefined
   */
  focused?: boolean;

  onPress: Function | undefined;

  /**
   * name for tracking action
   * @default undefined
   */
  name: string;

  /**
   * Disable action
   * @default undefined
   */
  disable?: boolean;
}
