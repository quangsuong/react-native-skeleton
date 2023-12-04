import { K_SCREEN_WIDTH } from '@common';
import { Button, Text } from '@components';
import { ENVConfig } from '@config/env';
import { Space } from '@foundation';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import React, { useCallback } from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const NetworkLoggerComponent = () => {
  const _goToLogger = useCallback(() => {
    navigate(APP_SCREEN.NETWORK_LOGGER);
  }, []);

  const x = useSharedValue<number>(K_SCREEN_WIDTH - 60);
  const y = useSharedValue<number>(100);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: () => {},
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      transform: [{ translateX: x.value }, { translateY: y.value }],
      zIndex: 9999,
      padding: Space.spacing_2xs,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: 'red',
    };
  });

  return ENVConfig.APP_ENV === 'Prod' ? null : (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={animatedStyle}>
        <Button name="logger-debug" onPress={_goToLogger}>
          <Text preset={'subtitle4'}>LOGGER</Text>
        </Button>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default NetworkLoggerComponent;
