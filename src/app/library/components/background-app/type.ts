import { ImageTypes } from '@assets/image';
import React from 'react';
import { ViewProps } from 'react-native';

export interface BackgroundProps extends ViewProps {
  /**
   * turnOnSafe is turn on safe view
   * @default true
   */
  turnOnSafe?: boolean;

  /**
   * gradient is show gradient and non-gradient
   * @default true
   */
  gradient?: boolean;

  /**
   * disable touch when wrap listview
   * @default false
   */

  noTouch?: boolean;

  /**
   * backgroundColor for _renderNonGradient
   * @default false
   */
  backgroundColor?: string;

  /**
   * gradient colors
   * @default []
   */
  gradients?: (string | number)[];

  /**
   * gradient colors
   * @default '''
   */
  customTheme?: string;

  /**
   * padding bottom
   * @default false
   */
  noPaddingBottom?: boolean;

  /**
   * force use background
   * @default false
   */
  forceUseImage?: boolean;
  /**
   * custom background image name
   */
  customBg?: ImageTypes | string;
  SoureImgBg?: React.ComponentType<any> | React.ReactElement<unknown> | null | undefined;

  /**
   * backgroundColor for _renderNonGradient
   * @default undefined
   */
  colorHalfLinear?: string;
}
