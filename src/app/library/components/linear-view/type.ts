import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradientProps } from 'react-native-linear-gradient';

export enum DirectType {
  vertical = 'vertical',
  horizontal = 'horizontal',
  topLeftToRight = 'topLeftToRight',
  bottomLeftToRight = 'bottomLeftToRight',
}

export interface LinearProps extends LinearGradientProps {
  /**
   * direct type of linear
   * @default vertical
   */
  direct?: keyof typeof DirectType | DirectType.vertical;

  /**
   * Overwrite style for button
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;
}
