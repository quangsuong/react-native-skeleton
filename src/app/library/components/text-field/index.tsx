import { useTheme } from '@theme';
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';

import { sizeScale } from '@common';
import { TextStyle } from 'react-native';
import { Block } from '../block';
import { Button } from '../button';
import { IconSvgLocal } from '../icon-vec-local';
import { InputFlat } from './components/flat';
import { InputOutline } from './components/out-line';
import { useStyles } from './styles';
import { TextFieldProps } from './type';

export const TextField = forwardRef<any, TextFieldProps>((props, refs) => {
  // state
  const { typeInput } = props;
  const { colors } = useTheme();
  const [focusing, setFocus] = useState(false);
  const { inputStyle } = props;
  const [text, setText] = useState('');
  const styles = useStyles();
  const refInput = useRef(null);

  const onFocus = useCallback(() => {
    props?.onFocus?.();
    setFocus(true);
  }, [props?.onFocus]);

  const onBlur = useCallback(() => {
    props?.onBlur?.();
    setFocus(false);
  }, [props?.onBlur]);

  const searchStyle = useMemo(() => {
    if (props.isSearchField)
      return focusing ? { paddingLeft: sizeScale(10) } : { paddingLeft: sizeScale(36) };
  }, [focusing, props.isSearchField]);

  const customInputStyle: TextStyle = useMemo(() => {
    return [{ color: colors.color_800, ...inputStyle }, searchStyle];
  }, [inputStyle, colors, searchStyle, props.isSearchField]);

  const onChangeText = useCallback(
    (text) => {
      setText(text);
      props?.onChangeText?.(text);
    },
    [props?.onChangeText]
  );

  const searchIcon = useMemo(() => {
    if (props.isSearchField && !focusing)
      return (
        <Block left={sizeScale(12)} position="absolute">
          <IconSvgLocal color={colors.color_200} name="SEARCH_ICON" />
        </Block>
      );
  }, [props.isSearchField, colors, focusing]);

  const clearText = useCallback(() => {
    (refs ?? refInput).current.setNativeProps({ text: '' });
    props.onChangeText?.('');
    setText('');
  }, [props?.onChangeText]);

  const rightIcon = useMemo(() => {
    if (props.isSearchField && text?.length > 0)
      return (
        <Button name="clear" onPress={clearText} style={styles.clearBtn}>
          <IconSvgLocal name="IC_REMOVE" color={colors.color_600} />
        </Button>
      );
  }, [props.isSearchField, colors, text]);

  const containerStyle = useMemo(
    () => [props.containerStyle, focusing && styles.focusContainerStyle],
    [props.containerStyle, focusing]
  );

  const shareProps = useMemo(() => {
    return {
      inputStyle: customInputStyle,
      ref: refs ?? refInput,
      placeholderColor: colors.color_600,
      onFocus,
      onBlur,
      leftChildren: props.leftChildren ?? searchIcon,
      rightChildren: props.rightChildren ?? rightIcon,
      onChangeText,
    };
  }, [
    colors,
    inputStyle,
    refs,
    onFocus,
    onBlur,
    props.leftChildren,
    searchIcon,
    props.rightChildren,
    rightIcon,
    refInput,
  ]);

  // render
  return typeInput === 'flat' ? (
    <InputFlat {...props} {...shareProps} containerStyle={containerStyle} />
  ) : (
    <InputOutline {...props} {...shareProps} containerStyle={containerStyle} />
  );
});
