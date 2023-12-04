import React, { FC, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useBottomDropdown } from './styles';

interface Iprops {
  animatedIndex: any;
  style: StyleProp<ViewStyle>;
  closeModal: () => void;
}
export const CustomBackdrop: FC<Iprops> = ({ animatedIndex, style, closeModal }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 0.5], [0, 0.5], Extrapolate.CLAMP),
  }));

  const styles = useBottomDropdown();
  // styles
  const containerStyle = useMemo(
    () => [style, styles.backdrop, containerAnimatedStyle],
    [style, styles.backdrop, containerAnimatedStyle]
  );

  return <Animated.View onTouchStart={closeModal} style={containerStyle} />;
};
