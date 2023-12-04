import { KeyboardTypeOptions, TextInput } from 'react-native';
export interface InputAccessoryProps {
  keyboardType: KeyboardTypeOptions | undefined;
  onChangeType: (param: KeyboardTypeOptions | undefined) => void;
  nextKeyboard: KeyboardTypeOptions | undefined;
  inputRef: TextInput;
  title?: string;
  nativeID?: string;
  keyboardHeight?: number;
}
