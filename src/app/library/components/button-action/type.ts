import { IconSvgTypes } from '@assets/icon';
import { TextPresetNames } from '@components/text/preset';
import { I18nKeys } from '@utils/i18n/locales';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
//extends ButtonProps
export interface ButtonActionProps {
  /**
   * Using svg icon for top button
   * @default undefined
   */
  icon?: IconSvgTypes;

  /**
   * Top icon width
   * @default undefined
   */
  iconWidth?: number;

  /**
   * Top icon height
   * @default undefined
   */
  iconHeight?: number;

  /**
   * Using color for top icon
   * @default undefined
   */
  iconColor?: string;

  /**
   * Using for show badge icon
   * @default undefined
   */
  showBadge?: boolean;

  /**
   * Number of badge show on top icon
   * @default undefined
   */
  badge?: number;

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
   * Using fontsize for text
   * @default undefined
   */
  fontSize?: number;

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
   * Margin between text and right icon
   * @default undefined
   */
  marginIcon?: number;

  /**
   * Overwrite style for button
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

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
