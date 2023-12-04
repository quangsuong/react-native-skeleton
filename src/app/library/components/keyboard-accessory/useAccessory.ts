import { isIos, K_WINDOW_HEIGHT, K_WINDOW_WIDTH } from '@common';
import { useBackHandler } from '@customHooks/useBackHandler';
import { useCallback, useEffect, useState } from 'react';
import { Keyboard, LayoutAnimation, Platform, StatusBar } from 'react-native';
import { KeyboardAccessoryViewProps } from './type';
export const useAccessory = (props: KeyboardAccessoryViewProps) => {
  const { alwaysVisible = false, animationConfig, animateOn = 'ios', onKeyboardShowDelay } = props;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [accessoryHeight, setAccessoryHeight] = useState(50);
  const [visibleAccessoryHeight, setVisibleAccessoryHeight] = useState(50);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const isSafeAreaSupported = isIos && (K_WINDOW_HEIGHT > 800 || K_WINDOW_WIDTH > 800);
  const accessoryAnimation = useCallback((duration, easing, animationConfig = null) => {
    if (animationConfig) {
      if (typeof animationConfig === 'function') {
        return animationConfig(duration, easing);
      }
      return animationConfig;
    }

    if (!isIos) {
      return {
        duration: 200,
        create: {
          duration: 200,
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.linear,
        },
      };
    }

    return LayoutAnimation.create(
      duration,
      LayoutAnimation.Types[easing],
      LayoutAnimation.Properties.opacity
    );
  }, []);
  const handleChildrenLayout = useCallback(
    (layoutEvent) => {
      setVisibleAccessoryHeight(layoutEvent.nativeEvent.layout.height);
      setAccessoryHeight(
        alwaysVisible || isKeyboardVisible ? layoutEvent.nativeEvent.layout.height : 0
      );
    },
    [alwaysVisible, isKeyboardVisible]
  );
  const handleKeyboardShow = useCallback(
    (keyboardEvent) => {
      const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
      const keyboardHeight = Platform.select({
        ios: keyboardEvent.endCoordinates.height,
        android: keyboardEvent.endCoordinates.height + STATUS_BAR_HEIGHT,
      });

      const keyboardAnimate = () => {
        if (animateOn === 'all' || Platform.OS === animateOn) {
          LayoutAnimation.configureNext(
            accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing, animationConfig)
          );
        }
        setIsKeyboardVisible(true);
        setKeyboardHeight(keyboardHeight);
      };

      if (isIos || typeof onKeyboardShowDelay !== 'number') {
        keyboardAnimate();
      } else {
        setTimeout(() => {
          keyboardAnimate();
        }, onKeyboardShowDelay);
      }
      setIsKeyboardVisible(true);
      setKeyboardHeight(keyboardHeight);
      setAccessoryHeight(visibleAccessoryHeight);
    },
    [accessoryAnimation, animateOn, animationConfig, onKeyboardShowDelay, visibleAccessoryHeight]
  );
  const handleKeyboardHide = useCallback(
    (keyboardEvent) => {
      if (animateOn === 'all' || Platform.OS === animateOn) {
        LayoutAnimation.configureNext(
          animationConfig ||
            accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing, animationConfig)
        );
      }
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
      setAccessoryHeight(alwaysVisible ? visibleAccessoryHeight : 0);
    },
    [accessoryAnimation, alwaysVisible, animateOn, animationConfig, visibleAccessoryHeight]
  );
  useEffect(() => {
    const keyboardShowEvent = isIos ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHideEvent = isIos ? 'keyboardWillHide' : 'keyboardDidHide';
    const subscriptions = [
      Keyboard.addListener(keyboardShowEvent, handleKeyboardShow),
      Keyboard.addListener(keyboardHideEvent, handleKeyboardHide),
    ];
    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, [handleKeyboardHide, handleKeyboardShow]);
  const handleBackButton = useCallback(() => {
    if (!isIos) {
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
    }
    return true;
  }, []);
  useBackHandler(handleBackButton);
  return {
    accessoryHeight,
    keyboardHeight,
    isSafeAreaSupported,
    handleChildrenLayout,
    isKeyboardVisible,
  };
};
