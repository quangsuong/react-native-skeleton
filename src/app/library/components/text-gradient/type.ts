/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleProp, TextProps as TextProperties, TextStyle } from 'react-native';

import { Colors } from '@theme';
import { FontFamily } from '@theme/typography';
import { I18nKeys } from '@utils/i18n/locales';

import { DirectType } from '@components/linear-view/type';
import { TextPresetNames } from '../text/preset';

type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

export interface TextProps extends TextProperties {
  fontStyle?: 'normal' | 'italic';

  letterSpacing?: number;

  lineHeight?: number;

  /**
   * Children of text
   * @default undefined
   */
  children?: React.ReactNode;

  /**
   * Text which is looked up via i18n.
   * @default undefined
   */
  t18n?: I18nKeys;

  /**
   * Option of i18n
   * @default undefined
   */
  t18nOptions?: any;

  /**
   * Using text string instead i18n
   * @default undefined
   */
  text?: string;

  /**
   * Enable to using {flex:1}
   * @default undefined
   */
  flex?: boolean;

  /**
   * Overwrite font size
   * @default 14
   */
  fontSize?: number;

  /**
   * Overwrite font family
   * @default undefined
   */
  fontFamily?: FontFamily;

  /**
   * Using colors
   * @default undefined
   */
  colors?: string[];

  /**
   * Using locations
   * @default undefined
   */
  locations?: number[];

  /**
   * Overwrite background color with theme
   */
  colorTheme?: keyof Colors;

  /**
   * Set true for using textAlign = 'center'
   * @default undefined
   */
  center?: boolean;

  /**
   * Overwrite textAlign
   * @default undefined
   */
  textAlign?: TextAlign;

  /**
   * Overwrite textTransform
   * @default undefined
   */
  textTransform?: TextTransform;

  /**
   * Overwrite style of text component
   * @default undefined
   */
  style?: StyleProp<TextStyle>;
  /**
   * Preset for text
   * @default default
   */
  preset?: TextPresetNames;

  direct?: keyof typeof DirectType | DirectType.horizontal;
}
