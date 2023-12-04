import React, { createRef, forwardRef, memo, useImperativeHandle, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import isEqual from 'react-fast-compare';

import { useDisableBackHandler, useDismissKeyboard } from '@hooks';
import { useTheme } from '@theme';

import { AnimationFiles } from '@assets/animation';
import { sizeScale } from '@common';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { styles } from './styles';
import { LottieComponent } from "../../../common/components/LottieComponent";

interface Props {
  color?: string;
}

export const Spinner = memo((props: Props) => {
  const { color } = props;
  // state
  const theme = useTheme();
  // render
  return <ActivityIndicator color={color || theme.colors.primary} size={'large'} />;
}, isEqual);

const ProgressDialogComponent = forwardRef((_, ref) => {
  // state
  const [visible, setVisible] = useState(false);

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    }),
    []
  );

  useDisableBackHandler(visible);

  useDismissKeyboard(visible);

  // render
  return visible ? (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.container]}>
      {/* <Spinner /> */}
      <LottieComponent
        source={AnimationFiles.ic_loading}
        style={{ width: sizeScale(120) }}
        resizeMode="cover"
        loop={true}
        // {...frames}
        autoPlay
      />
    </Animated.View>
  ) : null;
});

export const progressDialogRef = createRef<ProgressDialogRef>();
export const ProgressDialog = () => <ProgressDialogComponent ref={progressDialogRef} />;

export const showLoading = () => {
  // if (navigationUtils.checkRoute([APP_SCREEN.SCREEN_CODE_PUSH_UPDATE])) return;
  progressDialogRef.current?.show();
};

export const hideLoading = () => {
  progressDialogRef.current?.hide();
};
export interface ProgressDialogRef {
  show(): void;
  hide(): void;
}
