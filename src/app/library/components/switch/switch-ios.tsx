import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Animated, { Extrapolate, useAnimatedStyle } from 'react-native-reanimated';

import { useInterpolate, useInterpolateColor, useMix, useSharedTransition } from '@animated';
import { execFunc } from '@common';

import { useTheme } from '@theme';
import {
  BORDER_OFF_COLOR,
  BORDER_RADIUS_IOS,
  MARGIN,
  OFF_POSITION_IOS,
  ON_POSITION_IOS,
  THUMB_SIZE_IOS,
  WIDTH,
} from './constants';
import { SwitchProps } from './type';

const styles = StyleSheet.create({
  track: {
    width: WIDTH,
    height: THUMB_SIZE_IOS + MARGIN * 2,
    borderRadius: BORDER_RADIUS_IOS,
    borderWidth: MARGIN / 2,
    borderColor: 'transparent',
  },
  thumb: {
    position: 'absolute',
    top: MARGIN / 2,
    width: THUMB_SIZE_IOS,
    height: THUMB_SIZE_IOS,
    borderColor: BORDER_OFF_COLOR,
    borderRadius: THUMB_SIZE_IOS,
    backgroundColor: '#FFFFFF',
    shadowColor: BORDER_OFF_COLOR,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export const Switch = ({
  onToggle,
  value: overwriteValue,
  disable = false,
  initialValue = false,
  color,
}: Omit<SwitchProps, 'type'>) => {
  // state
  const [value, setValue] = useState<boolean>(initialValue);
  const { colors } = useTheme();
  // reanimated
  const progress = useSharedTransition(overwriteValue ?? value);
  const opacity = useMix(useSharedTransition(disable), 1, 0.5);
  const translateX = useInterpolate(
    progress,
    [0, 1],
    [OFF_POSITION_IOS, ON_POSITION_IOS],
    Extrapolate.CLAMP
  );
  const backgroundColor = useInterpolateColor(
    progress,
    [0, 1],
    [colors.color_300, color ?? colors.color_primary_500]
  );

  // function
  const _onToggle = useCallback(() => {
    if (typeof overwriteValue === 'boolean') {
      execFunc(onToggle, overwriteValue);
    } else {
      execFunc(onToggle, !value);
      setValue((v) => !v);
    }
  }, [onToggle, overwriteValue, value]);

  // reanimated style
  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value as string,
    opacity: opacity.value,
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const hitSlopSpace = 10;

  // render
  return (
    <TouchableWithoutFeedback
      hitSlop={{
        top: hitSlopSpace,
        left: hitSlopSpace,
        right: hitSlopSpace,
        bottom: hitSlopSpace,
      }}
      disabled={disable}
      onPress={_onToggle}
    >
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
