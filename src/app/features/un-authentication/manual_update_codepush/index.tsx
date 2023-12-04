import { K_PADDING_16, K_SCREEN_WIDTH, K_SIZE_60, K_WINDOW_HEIGHT, sizeScale } from '@common';
import { Block, Button, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import useManualCodePushHook from '@customHooks/useManualCodePushHook';
import { BorderRadius } from '@foundation';
import { useTheme } from '@theme';
import React, { createRef, forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyle } from './styles';

import { Shadow } from '@components/shadow';
import { Platform } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const FadeBlock = Animated.createAnimatedComponent(Block);
const hitSlop = { top: 8, left: 8, right: 16, bottom: 8 };

const Component = (props: any, ref: any) => {
  const styles = useStyle();
  const { colors, dark } = useTheme();
  const { t } = useTranslation();
  const {
    processUpdate,
    updating,
    updatePercent,
    isForce,
    visible,
    setVisible,
    expanded,
    toggleExpanded,
    isReadyRestart,
    restartApp,
  } = useManualCodePushHook();
  const insets = useSafeAreaInsets();

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

  const circular = useMemo(
    () => ({
      size: sizeScale(56),
      radius: sizeScale(28),
    }),
    []
  );

  const maxPositionHeight = useMemo(
    () =>
      K_WINDOW_HEIGHT -
      circular.size -
      insets.bottom +
      Platform.select({
        ios: 0,
        android: insets.top,
      }),
    []
  );
  const rightPosition = K_SCREEN_WIDTH - circular.size;

  const translateX = useSharedValue(rightPosition);
  const translateY = useSharedValue(sizeScale(100));

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
      translateX.value = withSpring(event.absoluteX > rightPosition / 2 ? rightPosition : 0);

      if (event.absoluteY < circular.size) {
        translateY.value = withSpring(insets.top);
      }

      if (event.absoluteY > maxPositionHeight) {
        translateY.value = withSpring(maxPositionHeight);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  if (!visible) {
    return null;
  }

  if (expanded) {
    return (
      <FadeBlock
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.container}
        marginTop={K_SIZE_60}
        position={'absolute'}
        zIndex={100000000}
      >
        <Shadow style={styles.shadow_expanded}>
          <Block
            flex={1}
            color={colors.color_50}
            borderRadius={BorderRadius.border_radius_l}
            padding={K_PADDING_16}
          >
            <Block>
              <Block direction="row">
                <IconSvgLocal
                  name={isReadyRestart ? 'IC_UPDATED_CODEPUSH' : 'IC_UPDATING_CODEPUSH'}
                  color={isReadyRestart ? colors.color_success_500 : colors.color_primary_500}
                />
                <Text
                  text={t(`text:${isReadyRestart ? 'updated' : 'updating'}`, {
                    percent: updatePercent,
                  })}
                  color={colors.color_800}
                  preset="body2"
                  style={styles.txt_status}
                />
                {!isReadyRestart && (
                  <Button
                    hitSlop={hitSlop}
                    name="collapse_codepush_progress"
                    t18n="text:hide"
                    preset="body1"
                    textColor={colors.color_link_500}
                    onPress={toggleExpanded}
                    style={styles.action}
                  />
                )}
              </Block>
            </Block>

            <Block
              height={sizeScale(5)}
              marginTop={K_PADDING_16}
              direction="row"
              borderRadius={sizeScale(2.5)}
              flex={1}
              color={colors.color_300}
              overflow="hidden"
            >
              <Block
                flex={updatePercent}
                color={isReadyRestart ? colors.color_success_500 : colors.color_primary_500}
              />
              <Block flex={100 - updatePercent} />
            </Block>

            {isReadyRestart && (
              <Block direction="row" paddingTop={K_PADDING_16} alignSelf="flex-end">
                <Button
                  name="code_push_later"
                  t18n="text:later"
                  preset="body1"
                  textColor={colors.color_700}
                  style={styles.action}
                  onPress={hideManualCodePush}
                  hitSlop={hitSlop}
                />
                <Button
                  name="code_push_restart"
                  t18n="text:restart"
                  preset="body1"
                  textColor={colors.color_link_500}
                  onPress={restartApp}
                  style={styles.action}
                  hitSlop={hitSlop}
                />
              </Block>
            )}
          </Block>
        </Shadow>
      </FadeBlock>
    );
  }

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[styles.collapsedBtn, rStyle]}>
        <Button
          name="toggle_codepush_progress"
          activeOpacity={0.8}
          onPress={toggleExpanded}
          hitSlop={hitSlop}
        >
          <Block
            height={circular.size}
            width={circular.size}
            borderRadius={circular.radius}
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress
              value={updatePercent}
              radius={circular.radius}
              duration={0}
              showProgressValue={false}
              activeStrokeColor={colors.color_primary_500}
              inActiveStrokeColor={colors.color_300}
              activeStrokeWidth={sizeScale(6)}
              inActiveStrokeWidth={sizeScale(6)}
              circleBackgroundColor={colors.color_50}
              allowFontScaling={false}
            />
            <Text
              text={updatePercent + '%'}
              style={styles.progressTxt}
              preset="subtitle4"
              color={colors.color_800}
            />
          </Block>
        </Button>
      </Animated.View>
    </PanGestureHandler>
  );
};

export const _ManualUpdateCodePush = memo(forwardRef(Component), isEqual);

export const manualUpdateCodePushRef = createRef<ManualUpdateCodePushRef>();

export const ManualUpdateCodePush = () => <_ManualUpdateCodePush ref={manualUpdateCodePushRef} />;

export const showManualCodePush = () => {
  manualUpdateCodePushRef.current?.show();
};

export const hideManualCodePush = () => {
  manualUpdateCodePushRef.current?.hide();
};
export interface ManualUpdateCodePushRef {
  show(): void;
  hide(): void;
}
