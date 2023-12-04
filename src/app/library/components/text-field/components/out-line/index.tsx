/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

import { useInterpolate, useSharedTransition } from '@animated';
import { onCheckType } from '@common';

import { styles } from './styles';
import { InputOutlineProps } from './type';

import { useTheme } from '@theme';
import { FontDefault } from '@theme/typography';

import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

// const UN_ACTIVE_COLOR = '#E4E5F0';
// const ACTIVE_COLOR = Colors.color_primary_600;
// const ERROR_COLOR = 'rgb(214,45,32)';

export const InputOutline = forwardRef<any, InputOutlineProps>((props, ref) => {
  const { colors } = useTheme();

  // props
  const {
    label,
    labelTx,
    rxRemove,
    placeholder,
    nameTrigger,
    defaultValue,
    rightChildren,
    leftChildren,
    placeholderT18n,
    trigger,
    onBlur,
    onFocus,
    onSubmit,
    onChangeText,
    error = undefined,
    disabled = false,
    touchable = false,
    inputStyle: inputStyleOverwrite = {},
    containerStyle: containerStyleOverwrite = {},
    errorLabelColor = colors.color_error_500,
    placeholderColor = colors.color_300,
    errorBorderColor = colors.color_error_500,
    disabledLabelColor = colors.color_300,
    activeTintBorderColor = colors.color_primary_500,
    activeTintLabelColor = colors.color_primary_500,
    unActiveTintBorderColor = colors.color_300,
    unActiveTintLabelColor = colors.color_300,
    disabledBorderColor = colors.color_300,
    isInputBottomSheet = false,
    ...rest
  } = props;

  // state
  const [t] = useTranslation();
  const [heightContainerInput, setHeightContainerInput] = useState(0);
  const [localDefaultValue, setLocalDefaultValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  // reanimated
  const progress = useSharedTransition(focused || value.length > 0, {
    duration: 150,
  });

  const minBottom = Platform.OS === 'ios' ? 0 : 4;
  const bottom = useInterpolate(progress, [0, 1], [minBottom, heightContainerInput]);

  const fontLabel = useInterpolate(progress, [0, 1], [14, 11]);

  const labelColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledLabelColor;
      case error:
        return errorLabelColor;
      case focused:
        return activeTintLabelColor;
      default:
        return unActiveTintLabelColor;
    }
  });

  const borderColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledBorderColor;
      case error:
        return errorBorderColor;
      case focused:
        return activeTintBorderColor;
      default:
        return unActiveTintBorderColor;
    }
  });

  // function
  const onLayoutContainerInput = (e: LayoutChangeEvent) => {
    setHeightContainerInput(e.nativeEvent.layout.height);
  };

  const _onFocus = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (onCheckType(onFocus, 'function')) {
      onFocus(e);
    }
    setFocused(true);
  };

  const _onBlur = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (onCheckType(onBlur, 'function')) {
      onBlur(e);
    }
    setFocused(false);
  };

  const _onChangeText = (text: string) => {
    const actualText = rxRemove !== undefined ? text.replace(rxRemove, '') : text;
    setValue(actualText);
    if (onCheckType(onChangeText, 'function')) {
      onChangeText(actualText);
    }
    if (onCheckType(trigger, 'function') && onCheckType(nameTrigger, 'string')) {
      setTimeout(() => {
        trigger(nameTrigger);
      }, 0);
    }
  };

  // effect
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setLocalDefaultValue(String(defaultValue));
    }
  }, [defaultValue]);

  // string
  const labelText = useMemo(
    () => (labelTx && t(labelTx)) || label || undefined,
    [labelTx, label, t]
  );

  const placeHolder = useMemo(
    () => (placeholderT18n && t(placeholderT18n)) || placeholder || '',
    [placeholder, placeholderT18n, t]
  );

  // reanimated style
  const wrapLabelStyle = useAnimatedStyle(() => ({
    bottom: bottom.value - 2,
  }));

  const labelStyle = useAnimatedStyle(() => ({
    fontSize: fontLabel.value,
    fontFamily: FontDefault.primary,
    color: labelColor.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  // render
  return (
    <Animated.View style={[styles.container, containerStyleOverwrite, containerAnimatedStyle]}>
      <View style={[styles.content]}>
        {labelText && (
          <Animated.View pointerEvents={'none'} style={[styles.wrapLabel, wrapLabelStyle]}>
            <Animated.Text style={[styles.text, labelStyle]}>{labelText ?? ''}</Animated.Text>
          </Animated.View>
        )}
        <View style={[styles.flex]} onLayout={onLayoutContainerInput}>
          <View style={styles.overlay_left}>{leftChildren}</View>
          {isInputBottomSheet ? (
            <BottomSheetTextInput
              defaultValue={localDefaultValue}
              autoCorrect={false}
              editable={!disabled}
              clearButtonMode={'never'}
              selectionColor={activeTintBorderColor}
              style={[styles.input, inputStyleOverwrite]}
              placeholderTextColor={colors.color_600}
              ref={ref}
              placeholder={placeHolder}
              onSubmitEditing={onSubmit}
              {...rest}
              onChangeText={_onChangeText}
              onFocus={_onFocus}
              onBlur={_onBlur}
              value={rest.value ?? value}
            />
          ) : (
            <TextInput
              defaultValue={localDefaultValue}
              autoCorrect={false}
              editable={!disabled}
              clearButtonMode={'never'}
              selectionColor={activeTintBorderColor}
              style={[styles.input, inputStyleOverwrite]}
              placeholderTextColor={colors.color_600}
              ref={ref}
              placeholder={placeHolder}
              onSubmitEditing={onSubmit}
              {...rest}
              onChangeText={_onChangeText}
              onFocus={_onFocus}
              onBlur={_onBlur}
              value={rest.value ?? value}
            />
          )}
        </View>
        <View style={styles.overlay_right}>{rightChildren}</View>
      </View>
      {touchable ? (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]} />
      ) : null}
    </Animated.View>
  );
});
