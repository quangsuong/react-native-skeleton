import React, { forwardRef, memo, ReactNode, useMemo } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block } from '@components';
import { InputBaseProps } from '@components/text-field/type';
import { useTheme } from '@theme';
import CurrencyInput from 'react-native-currency-input';
import { Masks } from 'react-native-mask-input';

export type PropCurrencys = {
  value: string;
  placeHolder?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  separator?: string;
  security?: boolean;
  clearAllText?: boolean;
  delimiter?: string;
  onSetFieldValue?: (value: string) => void;
  hideErrorMsg?: boolean;
  optional?: boolean;
  obfuscation?: boolean;
  maskType?: typeof Masks;
  suffix?: string;
  inputStyle?: StyleProp<InputBaseProps>;
  inputContainerStyle?: StyleProp<InputBaseProps>;
  rightComponent?: ReactNode;
  isCurrency?: boolean;
  maxValue?: number;
  onChangeValue: (value: number) => void;
  minValue?: number;
  disabled?: boolean;
};

const Component = forwardRef((props: InputBaseProps & PropCurrencys) => {
  const { colors } = useTheme();
  const {
    // onFocus,
    // onBlur,
    style,
    placeHolder,
    separator,
    delimiter,
    suffix,
    ref,
    ...rest
  }: InputBaseProps & PropCurrencys = props;

  // const [focused, setFocused] = useState(false);
  // const _onFocus = useCallback((e: any) => {
  //   onFocus?.(e);
  //   setFocused(true);
  // }, []);

  // const _onBlur = useCallback((e: any) => {
  //   onBlur?.(e);
  //   setFocused(false);
  // }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        defaultInput: {
          color: colors.color_800,
        },
      }),
    [colors]
  );

  return (
    <Block justifyContent="center">
      <CurrencyInput
        delimiter={delimiter ?? ','}
        separator={separator ?? ','}
        // onFocus={_onFocus}
        // onBlur={_onBlur}
        placeholder={placeHolder ?? ''}
        placeholderTextColor={colors.color_600}
        style={[styles.defaultInput, style]}
        minValue={props.minValue || 0}
        keyboardType={'number-pad'}
        precision={0}
        suffix={suffix ?? ''}
        ref={ref}
        {...rest}
      />
      {rest.rightComponent}
    </Block>
  );
});
export const CustomCurrencyInput = memo(Component, isEqual);
