import { ImageSourcePropType, ViewStyle } from 'react-native';

export interface AvatarProps {
  /**
   * Source image of avatar
   * @default undefined
   */
  source?: ImageSourcePropType;

  size?: number;

  /**
   * disable onPress
   * @default false
   */
  disabled?: boolean;

  style?: ViewStyle;
}
