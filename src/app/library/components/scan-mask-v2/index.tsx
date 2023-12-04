import { K_QR_SCAN_SIZE, K_QR_SCAN_X, K_QR_SCAN_Y } from '@common';
import { Block } from '@components/block';
import { Spinner } from '@components/progress-dialog';
import { useTheme } from '@theme';
import React, { forwardRef, memo, useEffect, useImperativeHandle } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native';
import { RNHoleView } from 'react-native-hole-view';
import Animated, {
  Easing,
  // useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Rect, Svg } from 'react-native-svg';
import { useScanMaskStyle } from './styles';

// const K_SCAN_MASK_SIZE = 87
const K_SCAN_TIME = 2000;

interface Props {
  cameraOpened: boolean;
}

const AnimatedBlock = Animated.createAnimatedComponent(Block);
const AnimatedSpinner = Animated.createAnimatedComponent(Block);

const Component = forwardRef(({ cameraOpened }: Props, ref) => {
  // state
  const { colors } = useTheme();
  const styles = useScanMaskStyle();
  const animateTo = useSharedValue(0);
  const animateOpacity = useSharedValue(1);
  const animateToLoading = useSharedValue<true | false>(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animateTo.value,
        },
      ],
      opacity: cameraOpened ? 1 : 0,
    };
  });

  const animatedSpinerStyle = useAnimatedStyle(() => {
    return {
      opacity: animateToLoading.value ? 1.0 : 0.0,
    };
  });

  const animatedFillStyle = useAnimatedStyle(() => {
    return {
      opacity: animateOpacity.value,
    };
  });

  useImperativeHandle(
    ref,
    () => ({
      showLoading: () => {
        animateToLoading.value = true;
      },
      hideLoading: () => {
        animateToLoading.value = false;
      },
    }),
    []
  );

  useEffect(() => {
    if (cameraOpened) {
      animateTo.value = withRepeat(
        withTiming(K_QR_SCAN_SIZE - 6, { duration: K_SCAN_TIME }),
        -1,
        true
      );
      animateOpacity.value = withTiming(0, {
        duration: 400,
        easing: Easing.linear,
      });
    }
  }, [cameraOpened]);

  // render
  return (
    <>
      <AnimatedBlock style={[StyleSheet.absoluteFill, animatedFillStyle]} color={'black'} />
      <Block style={StyleSheet.absoluteFill}>
        <RNHoleView
          style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.8)' }]}
          holes={[
            {
              x: K_QR_SCAN_X,
              y: K_QR_SCAN_Y,
              width: K_QR_SCAN_SIZE,
              height: K_QR_SCAN_SIZE,
            },
          ]}
        ></RNHoleView>
        <Svg width={'100%'} height={'100%'}>
          <Rect
            x={K_QR_SCAN_X}
            y={K_QR_SCAN_Y}
            width="40"
            height="4"
            rx="2"
            fill={colors.color_primary_500}
          />
          <Rect
            x={K_QR_SCAN_X}
            y={K_QR_SCAN_Y}
            width="4"
            height="40"
            rx="2"
            fill={colors.color_primary_500}
          />
          <Rect
            x={K_QR_SCAN_X + K_QR_SCAN_SIZE - 40}
            y={K_QR_SCAN_Y}
            width="40"
            height="4"
            rx="2"
            fill={colors.color_primary_500}
          />
          <Rect
            x={K_QR_SCAN_X + K_QR_SCAN_SIZE - 4}
            y={K_QR_SCAN_Y}
            width="4"
            height="40"
            rx="2"
            fill={colors.color_primary_500}
          />
          <Rect
            x={K_QR_SCAN_X + K_QR_SCAN_SIZE - 40}
            y={K_QR_SCAN_Y + K_QR_SCAN_SIZE - 4}
            width="40"
            height="4"
            rx="2"
            fill={colors.color_primary_500}
          />
          <Rect
            x={K_QR_SCAN_X + K_QR_SCAN_SIZE - 4}
            y={K_QR_SCAN_Y + K_QR_SCAN_SIZE - 40}
            width="4"
            height="40"
            rx="2"
            fill={colors.color_primary_500}
          />
          <Rect
            x={K_QR_SCAN_X}
            y={K_QR_SCAN_Y + K_QR_SCAN_SIZE - 4}
            width="40"
            height="4"
            rx="2"
            fill={colors.color_primary_500}
          />
          <Rect
            x={K_QR_SCAN_X}
            y={K_QR_SCAN_Y + K_QR_SCAN_SIZE - 40}
            width="4"
            height="40"
            rx="2"
            fill={colors.color_primary_500}
          />
        </Svg>
        <AnimatedBlock style={[styles.line, animatedStyle]} zIndex={9} />
        <AnimatedSpinner style={[styles.spiner, animatedSpinerStyle]} zIndex={11}>
          <Spinner />
        </AnimatedSpinner>
      </Block>
    </>
  );
});

export const ScanMask = memo(Component, isEqual);
