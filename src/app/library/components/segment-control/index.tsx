import { Text } from '@components/text';
import { useTheme } from '@theme';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useSegmentControlStyle } from './styles';
import { SegmentedControlProps } from './type';

const defaultShadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
};

const DEFAULT_SPRING_CONFIG = {
  stiffness: 150,
  damping: 20,
  mass: 1,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};
interface IProps extends SegmentedControlProps {
  widthStyle?: number;
  styleContainSegment?: ViewStyle;
  isShadow?: boolean;
  backgroundBadgeColorActive?: string;
}
const SegmentedControl: React.FC<IProps> = ({
  segments,
  currentIndex,
  onChange,
  badgeValues = [],
  isRTL = false,
  containerMargin = 0,
  activeTextStyle,
  inactiveTextStyle,
  segmentedControlWrapper,
  pressableWrapper,
  tileStyle,
  activeBadgeStyle,
  inactiveBadgeStyle,
  badgeTextStyle,
  widthStyle,
  styleContainSegment,
  isShadow = true,
  backgroundBadgeColorActive,
}: IProps) => {
  const width = widthPercentageToDP('100%') - containerMargin * 2;
  const translateValue = widthStyle || width / segments.length;
  const tabTranslateValue = useSharedValue(0);
  const { colors } = useTheme();
  const styles = useSegmentControlStyle();

  // useCallBack with an empty array as input, which will call inner lambda only once and memoize the reference for future calls
  const memoizedTabPressCallback = React.useCallback(
    (index) => {
      onChange(index);
    },
    [onChange]
  );
  useEffect(() => {
    // If phone is set to RTL, make sure the animation does the correct transition.
    const transitionMultiplier = isRTL ? -1 : 1;
    tabTranslateValue.value = withSpring(
      currentIndex * (translateValue * transitionMultiplier),
      DEFAULT_SPRING_CONFIG
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const tabTranslateAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabTranslateValue.value }],
    };
  });

  const finalisedActiveTextStyle: TextStyle = {
    textAlign: 'center',
    color: colors.title,
    ...activeTextStyle,
  };

  const finalisedInActiveTextStyle: TextStyle = {
    textAlign: 'center',
    color: colors.color_700,
    ...inactiveTextStyle,
  };

  const finalisedActiveBadgeStyle: ViewStyle = {
    backgroundColor: '#27272a',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    ...activeBadgeStyle,
  };

  const finalisedInActiveBadgeStyle: ViewStyle = {
    backgroundColor: '#6b7280',
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    ...inactiveBadgeStyle,
  };

  const finalisedBadgeTextStyle: TextStyle = {
    textAlign: 'center',
    color: colors.color_50,
    ...badgeTextStyle,
  };

  return (
    <Animated.View style={[styles.defaultSegmentedControlWrapper, segmentedControlWrapper]}>
      <Animated.View
        style={[
          styles.movingSegmentStyle,
          isShadow && defaultShadowStyle,
          tileStyle,
          StyleSheet.absoluteFill,
          {
            width: widthStyle || width / segments.length - 8,
            backgroundColor: backgroundBadgeColorActive ?? colors.color_50,
          },
          tabTranslateAnimatedStyles,
          styleContainSegment,
        ]}
      />
      {segments.map((segment, index) => {
        const isSelected = currentIndex === index;
        return (
          <Pressable
            onPress={() => memoizedTabPressCallback(index)}
            key={index}
            style={[styles.touchableContainer, pressableWrapper]}
          >
            <View style={styles.textWrapper}>
              <Text
                style={[isSelected ? finalisedActiveTextStyle : finalisedInActiveTextStyle]}
                preset={'body2'}
              >
                {segment}
              </Text>
              {badgeValues[index] && (
                <View
                  style={[
                    styles.defaultBadgeContainerStyle,
                    isSelected ? finalisedActiveBadgeStyle : finalisedInActiveBadgeStyle,
                  ]}
                >
                  <Text style={finalisedBadgeTextStyle} preset={'body2'}>
                    {badgeValues[index]}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

export default SegmentedControl;
