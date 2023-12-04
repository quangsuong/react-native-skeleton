import { useInterpolate, useSharedTransition } from '@animated';
import { K_SIZE_16, K_SIZE_SCALE_40 } from '@common';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Platform } from 'react-native';
import { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const widthLogo = 150;
const heightLogo = 85;

const useAnimatedLogin = () => {
  const [t] = useTranslation();

  // handle Animated
  const [isHidePassWord, setIsHidePassWord] = useState(true);
  const [heightBottom, setHeightBottom] = useState(0);
  const inset = useSafeAreaInsets();
  const [focused, setFocused] = useState(false);

  const [heightKeyBoard, setHeightKeyBoard] = useState(0);

  const [heightKeyBoardFirst, setHeightKeyBoardFirst] = useState(0);

  const progress = useSharedTransition(focused, {
    duration: 500,
  });

  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const onShowKeyBoard = (e: any) => {
    // if(heightKeyBoard != 0) return;
    setIsKeyboardShow(true);
    const heightbox = heightKeyBoardFirst > 0 ? heightKeyBoardFirst : e.endCoordinates.height;

    const height = heightbox - heightBottom - K_SIZE_SCALE_40 - inset.bottom + K_SIZE_16;
    if (heightKeyBoardFirst == 0) {
      setHeightKeyBoardFirst(e.endCoordinates.height);
    }
    setHeightKeyBoard(height);
    setFocused(true);
  };

  const onHideKeyBoard = () => {
    setIsKeyboardShow(false);
    setFocused(false);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS == 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        onShowKeyBoard(e);
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS == 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        onHideKeyBoard();
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [heightBottom, heightKeyBoardFirst]);

  const boxActionMarginTop = useInterpolate(progress, [0, 1], [0, heightKeyBoard]);

  const getHeightBoxListAction = (e: any) => {
    const { height } = e.layout;
    if (height != heightBottom) {
      setHeightBottom(height);
    }
  };

  const boxListAction = useAnimatedStyle(() => {
    return {
      marginTop: boxActionMarginTop.value,
    };
  });

  return {
    isKeyboardShow,
    boxListAction,
    isHidePassWord,
    setIsHidePassWord,
    getHeightBoxListAction,
  };
};

export default useAnimatedLogin;
