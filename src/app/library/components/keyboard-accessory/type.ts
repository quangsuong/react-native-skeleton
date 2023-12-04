import { ViewStyle } from 'react-native';
interface AnimateOn {
  type: 'ios' | 'android' | 'all' | 'none';
}

type HeightProperty = 'height' | 'minHeight';
type ObjectType = object;
type FunctionType = (...args: any[]) => any;

type ObjectOrFunctionType = ObjectType | FunctionType;

export interface KeyboardAccessoryViewProps {
  style?: ViewStyle;
  animateOn?: AnimateOn['type'];
  animationConfig?: ObjectOrFunctionType;
  bumperHeight?: number;
  visibleOpacity?: number;
  heightProperty?: HeightProperty;
  hiddenOpacity?: number;
  onKeyboardShowDelay?: number | boolean;
  androidAdjustResize?: boolean;
  alwaysVisible?: boolean;
  hideBorder?: boolean;
  inSafeAreaView?: boolean;
  avoidKeyboard?: boolean;
  keyboardHeight?: number;
}
