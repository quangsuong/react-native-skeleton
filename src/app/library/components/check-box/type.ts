import { StyleProp, ViewStyle } from 'react-native';

import { TextProps } from '@components/text/type';
import { I18nKeys } from '@utils/i18n/locales';
import { ReactNode } from 'react';

export interface CheckboxProps extends TextProps {
  /**
   * Overwrite style for button
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Overwrite out line style
   * @default undefined
   */
  outlineStyle?: StyleProp<ViewStyle>;

  /**
   * Overwrite for fill style
   *  @default undefined
   */
  fillStyle?: StyleProp<ViewStyle>;

  /**
   * Disable checkbox
   * @default undefined
   */
  disable?: boolean;

  /**
   * Default value of checkbox
   * @default undefined
   */
  initialValue?: boolean;

  /**
   * Overwrite value of check box
   * @default undefined
   */
  value?: boolean;

  /**
   * Text to display
   * @default undefined
   */
  text?: string;

  /**
   * Key to using i18n
   * @default undefined
   */
  t18n?: I18nKeys;

  /**
   * On change function
   * @default undefined
   */
  onToggle?: (newValue: boolean) => void;

  // custom render title
  renderTitle?: ReactNode;
  /**
   *
   * @default undefined
   */
  customTitle?: ReactNode;
}
