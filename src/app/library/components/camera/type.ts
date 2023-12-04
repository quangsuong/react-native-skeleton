import { ViewStyle } from 'react-native';

export interface Props {
  style?: ViewStyle;
  onGoogleVisionBarcodesDetected: Function | undefined;
  flashMode?: 0 | 3;
}
