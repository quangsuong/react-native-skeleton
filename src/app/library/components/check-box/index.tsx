import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useMix, useSharedTransition } from '@animated';
import { execFunc } from '@common';

import { IconSvgs } from '@assets/icon';
import { Text } from '@components/text';
import { useCheckBoxStyle } from './styles';
import { CheckboxProps } from './type';

export const CheckBox = ({
  text,
  t18n,
  value,
  style,
  fillStyle,
  outlineStyle: outlineStyleOverwrite,
  onToggle,
  disable = false,
  initialValue = false,
  preset = 'body1',
  renderTitle,
  customTitle,
}: CheckboxProps) => {
  // state
  const [localValue, setLocalValue] = useState<boolean>(initialValue);
  const progress = useSharedTransition(value ?? localValue);
  const scale = useMix(progress, 0.4, 1);
  const opacity = useMix(progress, 0, 1);
  const containerBorderWidth = useMix(progress, 1.5, 0);
  const styles = useCheckBoxStyle();

  // function
  const onPress = useCallback(() => {
    if (typeof value === 'boolean') {
      execFunc(onToggle, !value);
    } else {
      execFunc(onToggle, !localValue);
      setLocalValue((v) => !v);
    }
  }, [localValue, onToggle, value]);

  // reanimated style
  const styleAnimated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const styleAnimatedBorder = useAnimatedStyle(() => ({
    borderWidth: containerBorderWidth.value,
  }));

  // render
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disable}
      onPress={onPress}
      hitSlop={{
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      }}
      style={[styles.root, style]}
    >
      <>
        <Animated.View style={[styles.outline, outlineStyleOverwrite, styleAnimatedBorder]}>
          <Animated.View style={[fillStyle, styleAnimated]}>
            <IconSvgs.IC_CHECKBOX />
          </Animated.View>
        </Animated.View>
        {renderTitle ?? customTitle ?? (
          <Text preset="body1" style={styles.label} {...{ text, t18n, preset }} />
        )}
      </>
    </TouchableOpacity>
  );
};
