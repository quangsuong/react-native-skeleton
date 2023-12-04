/* eslint-disable react-native/no-inline-styles */
import React, { FC, memo, useCallback } from 'react';
import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { useImageStyle } from './style';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

export interface ImageProps extends FastImageProps, PressableProps {
  /** Define the component passed to image.
   *  @default `Press handlers present then Pressable else View`
   */
  Component?: typeof React.Component;

  /** Specify a different component as the Image component. */
  ImageComponent?: typeof React.Component;

  /** Content to load when Image is rendering.
   */
  PlaceholderContent?: React.ReactElement;

  /** Additional styling for the container. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Additional styling for the children container. */
  childrenContainerStyle?: StyleProp<ViewStyle>;

  /** Additional styling for the placeholder container. */
  placeholderStyle?: StyleProp<ViewStyle>;

  /** Perform fade transition on image load. */
  transition?: boolean;

  /** Perform fade transition on image load. */
  transitionDuration?: number;
}

export const ImageLoader: FC<ImageProps> = ({
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  Component = onPress || onLongPress || onPressIn || onPressOut ? Pressable : View,
  placeholderStyle,
  PlaceholderContent,
  containerStyle,
  childrenContainerStyle = null,
  style = {},
  onLoad,
  children,
  transition = true,
  transitionDuration = 360,
  pressableProps,
  ...props
}) => {
  const placeholderOpacity = React.useRef(new Animated.Value(1));
  const styles = useImageStyle();
  const onLoadHandler = useCallback(
    (event) => {
      if (transition) {
        Animated.timing(placeholderOpacity.current, {
          toValue: 0,
          duration: transitionDuration,
          useNativeDriver: true,
        }).start();
      } else {
        placeholderOpacity.current.setValue(0);
      }
      onLoad?.(event);
    },
    [transition, transitionDuration, onLoad]
  );

  const hasImage = Boolean(props.source);

  return (
    <Component
      {...pressableProps}
      {...{ onPress, onPressIn, onPressOut, onLongPress }}
      accessibilityIgnoresInvertColors={true}
      style={StyleSheet.flatten([styles.container, containerStyle])}
    >
      <AnimatedFastImage
        testID="RNE__Image"
        {...props}
        {...{ transition, transitionDuration }}
        onLoad={onLoadHandler}
        style={StyleSheet.flatten([
          {
            opacity: placeholderOpacity.current.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                scale: placeholderOpacity.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.85],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
          StyleSheet.absoluteFill,
          style,
        ])}
      />
      {/* Transition placeholder */}
      <Animated.View
        pointerEvents={hasImage ? 'none' : 'auto'}
        accessibilityElementsHidden={hasImage}
        importantForAccessibility={hasImage ? 'no-hide-descendants' : 'yes'}
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: hasImage ? placeholderOpacity.current : 1,
          },
        ]}
      >
        <View
          testID="RNE__Image__placeholder"
          style={StyleSheet.flatten([style, styles.placeholder, placeholderStyle])}
        >
          {React.isValidElement(PlaceholderContent)
            ? PlaceholderContent
            : PlaceholderContent && (
                <Text testID="RNE__Image__Placeholder__Content">{PlaceholderContent}</Text>
              )}
        </View>
      </Animated.View>
      {/* Children for Image */}
      <View testID="RNE__Image__children__container" style={childrenContainerStyle ?? style}>
        {children}
      </View>
    </Component>
  );
};

export default memo(ImageLoader);
