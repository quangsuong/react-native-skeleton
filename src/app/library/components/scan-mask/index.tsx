import { K_QR_SCAN_SIZE, K_QR_SCAN_X, K_QR_SCAN_Y as QR_POSITION_Y, sizeScale } from '@common';
import { Block } from '@components/block';
import { useTheme } from '@theme';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  // useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ClipPath, Defs, Rect, Svg } from 'react-native-svg';
import { useScanMaskStyle } from './styles';

// const K_SCAN_MASK_SIZE = 87
const K_SCAN_TIME = 2000;

interface Props {
  cameraOpened: boolean;
  positionY?: number;
}

const AnimatedBlock = Animated.createAnimatedComponent(Block);
const AnimatedSpinner = Animated.createAnimatedComponent(Block);

const Component = forwardRef(({ cameraOpened, positionY }: Props, ref) => {
  const K_QR_SCAN_Y = positionY ?? QR_POSITION_Y;

  // state
  const { colors } = useTheme();
  const styles = useScanMaskStyle({ scan_y: K_QR_SCAN_Y });
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
      // opacity: animateToLoading.value ? 0.0 : 1.0
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
        withTiming(-K_QR_SCAN_SIZE + sizeScale(6), { duration: K_SCAN_TIME }),
        -1,
        true
      );
      animateOpacity.value = withTiming(0, {
        duration: 400,
        easing: Easing.linear,
      });
    }
  }, [cameraOpened]);

  const radius = useMemo(() => 8, []);
  const maskThickness = useMemo(() => 1, []);

  // render
  return (
    <>
      <AnimatedBlock style={[StyleSheet.absoluteFill, animatedFillStyle]} color={'black'} />
      <Block style={StyleSheet.absoluteFill}>
        <Svg width={'100%'} height={'100%'}>
          <Defs>
            <ClipPath id="clip">
              <Rect x="0" y="0" width="100%" height="100%" />
              <Rect
                x={K_QR_SCAN_X}
                y={K_QR_SCAN_Y}
                width={K_QR_SCAN_SIZE}
                height={K_QR_SCAN_SIZE}
                fill={'black'}
                rx={radius}
              />
            </ClipPath>
          </Defs>
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="black"
            opacity="0.8"
            clipPath="url(#clip)"
            // rx={radius}
          />

          <Defs>
            <ClipPath id="clip1">
              <Rect x="0" y="0" width="100%" height="100%" />
              <Rect
                x={K_QR_SCAN_X + maskThickness}
                y={K_QR_SCAN_Y + maskThickness}
                width={K_QR_SCAN_SIZE - 2 * maskThickness}
                height={K_QR_SCAN_SIZE - 2 * maskThickness}
                fill={'black'}
                rx={radius}
              />
            </ClipPath>
          </Defs>
          <Rect
            x={K_QR_SCAN_X}
            y={K_QR_SCAN_Y}
            width={K_QR_SCAN_SIZE}
            height={K_QR_SCAN_SIZE}
            rx={radius}
            fill={colors.color_primary_500}
            clipPath="url(#clip1)"
          />
        </Svg>
        <AnimatedBlock style={[styles.line, animatedStyle]} zIndex={9} />
      </Block>
    </>
  );
});

export const ScanMask = memo(Component, isEqual);
