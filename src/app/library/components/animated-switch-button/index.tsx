import { IconSvgs } from '@assets/icon';
import { Button } from '@components/button';
import { Colors, ColorsDark } from '@foundation';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolateColors, spring } from 'react-native-reanimated';

interface Props {
  handleOnPress?: Function;
  activeTrackColor?: string;
  inActiveTrackColor?: string;
  value?: boolean;
}

const AnimatedSwitch = (props: Props) => {
  const {
    handleOnPress = () => {},
    activeTrackColor = Colors.color_secondary_800,
    inActiveTrackColor = Colors.color_primary_100,
    value,
  } = props;
  const [switchTranslate] = useState(new Animated.Value(0));
  useEffect(() => {
    if (value) {
      spring(switchTranslate, {
        toValue: 28,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    } else {
      spring(switchTranslate, {
        toValue: 0,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    }
  }, [value, switchTranslate]);
  const interpolateBackgroundColor = {
    backgroundColor: interpolateColors(switchTranslate, {
      inputRange: [0, 22],
      outputColorRange: [inActiveTrackColor, activeTrackColor],
    }),
  };

  const interpolateColor = {
    backgroundColor: interpolateColors(switchTranslate, {
      inputRange: [0, 22],
      outputColorRange: [ColorsDark.color_primary_500, ColorsDark.color_secondary_500],
    }),
  };
  const memoizedOnSwitchPressCallback = React.useCallback(() => {
    handleOnPress(!value);
  }, [handleOnPress, value]);

  const _renderIcon = useCallback(() => {
    let ICON = IconSvgs.IC_SUN;
    if (value) {
      ICON = IconSvgs.IC_MOON;
    }
    return <ICON width={20} height={20} color={Colors.color_1000} />;
  }, [value]);

  return (
    <Button
      name={'switch_theme'}
      activeOpacity={1.0}
      onPress={memoizedOnSwitchPressCallback}
      hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
    >
      <Animated.View style={[styles.containerStyle, interpolateBackgroundColor]}>
        <Animated.View
          style={[
            styles.circleStyle,
            interpolateColor,
            {
              transform: [
                {
                  translateX: switchTranslate,
                },
              ],
            },
            styles.shadowValue,
          ]}
        >
          {_renderIcon()}
        </Animated.View>
      </Animated.View>
    </Button>
  );
};

const styles = StyleSheet.create({
  circleStyle: {
    width: 28,
    height: 28,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    width: 64,
    height: 36,
    paddingHorizontal: 4,
    borderRadius: 36.5,
    justifyContent: 'center',
  },
  shadowValue: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default AnimatedSwitch;
