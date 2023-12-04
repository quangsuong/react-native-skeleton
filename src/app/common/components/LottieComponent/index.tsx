import useAppState from '@customHooks/useAppState';
import AnimatedLottieView, { AnimatedLottieViewProps } from 'lottie-react-native';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';

interface LottieComponentProps extends AnimatedLottieViewProps {
  startFrame?: number;
  endFrame?: number;
}

const Component = (props: LottieComponentProps) => {
  const lottieRef = useRef<AnimatedLottieView>(null);
  const { currentAppState } = useAppState();

  useEffect(() => {
    playAnimation();
  }, [props.startFrame, props.endFrame]);

  const playAnimation = useCallback(() => {
    if (props.endFrame === undefined) {
      return lottieRef.current?.play();
    }
    lottieRef.current?.play(props.startFrame, props.endFrame);
  }, [props.startFrame, props.endFrame]);

  useEffect(() => {
    if (currentAppState === 'active') playAnimation();
  }, [currentAppState]);

  return <AnimatedLottieView resizeMode="cover" ref={lottieRef} {...props} />;
};
export const LottieComponent = memo(Component, isEqual);
