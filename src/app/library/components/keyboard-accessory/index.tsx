import { useKeyboard } from '@customHooks/useKeyboard';
import React, { FC, memo } from 'react';
import isEqual from 'react-fast-compare';
import { View } from 'react-native';
import { useAccessoryStyle } from './style';
import { KeyboardAccessoryViewProps } from './type';
import { useAccessory } from './useAccessory';

const Component: FC<KeyboardAccessoryViewProps> = (props) => {
  const {
    bumperHeight = 15,
    visibleOpacity = 1,
    heightProperty = 'height',
    hiddenOpacity = 0,
    alwaysVisible = false,
    hideBorder = false,
    inSafeAreaView = false,
    avoidKeyboard = false,
    style,
    children,
    keyboardHeight: propKeyboardHeight,
  } = props;
  const {
    accessoryHeight,
    // keyboardHeight,
    isSafeAreaSupported,
    isKeyboardVisible,
    handleChildrenLayout,
  } = useAccessory(props);

  const { keyboardHeight } = useKeyboard();
  const styles = useAccessoryStyle();
  const visibleHeight = accessoryHeight + (avoidKeyboard ? keyboardHeight : 0);
  const applySafeArea = isSafeAreaSupported && inSafeAreaView;
  const isChildRenderProp = typeof children === 'function';

  return (
    // <View
    //   style={{
    //     [heightProperty]:
    //       isKeyboardVisible || alwaysVisible ? visibleHeight : 0,
    //   }}>
    <View
      style={[
        styles.accessory,
        // !hideBorder && styles.accessoryBorder,
        style,
        {
          // opacity:
          // isKeyboardVisible || alwaysVisible
          //   ? visibleOpacity
          //   : hiddenOpacity,
          bottom: propKeyboardHeight ?? keyboardHeight,
        },
      ]}
    >
      <View onLayout={handleChildrenLayout}>
        {isChildRenderProp ? children({ isKeyboardVisible }) : children}
      </View>
    </View>
    // </View>
  );
};

export const KeyboardAccessoryView = memo(Component, isEqual);
