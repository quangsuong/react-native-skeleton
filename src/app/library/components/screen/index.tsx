import React, { useEffect, useMemo } from 'react';
import { StatusBar, useWindowDimensions, View, ViewProps, ViewStyle } from 'react-native';

import Animated from 'react-native-reanimated';
import {
  Edge,
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useTheme } from '@theme';

import { ScreenTrack } from '@components/tracks';
import { rxLightStatusBar } from '@config/regex';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { selectAppConfig } from '@redux-selector/app';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import { InsetComponentProps, InsetProps, ScreenComponentProps, ScreenProps } from './type';

const INSETS: Edge[] = ['top', 'bottom', 'left', 'right'];

const getEdges = (excludeEdges: ScreenProps['excludeEdges'], hiddenStatusBar: boolean) => {
  if (excludeEdges === 'all' || !excludeEdges) {
    return [];
  }
  const actualEdges = INSETS.filter((x) => !(excludeEdges ?? []).includes(x));
  if (hiddenStatusBar) {
    return actualEdges.filter((x) => x !== 'top');
  }
  return actualEdges;
};

const Inset = ({ color, height, width, bottom, left, right, top }: InsetProps) => {
  // state
  const style = useMemo<ViewStyle>(
    () => ({
      backgroundColor: color,
      width,
      height,
      top,
      left,
      bottom,
      right,
    }),
    [bottom, color, height, left, right, top, width]
  );
  // render
  return <View style={[styles.insets, style]} />;
};

const InsetComponent = ({
  edges,
  bottomInsetColor,
  hiddenStatusBar,
  leftInsetColor,
  rightInsetColor,
  statusColor,
  unsafe = true,
  statusBarStyle,
}: InsetComponentProps) => {
  // state
  const inset = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { theme } = useSelector(selectAppConfig);

  const lightStatusBar = rxLightStatusBar.test(theme);

  const _sttbarStyle = useMemo(() => {
    return statusBarStyle || lightStatusBar ? 'light-content' : 'dark-content';
  }, [theme, statusBarStyle]);

  // render
  return (
    <>
      <StatusBar
        hidden={hiddenStatusBar}
        backgroundColor={'transparent'}
        translucent
        barStyle={_sttbarStyle}
      />
      {!unsafe && edges.includes('top') && (
        <Inset color={statusColor} top={0} height={inset.top} width={screenWidth} />
      )}
      {!unsafe && edges.includes('left') && (
        <Inset color={leftInsetColor} left={0} height={screenHeight} width={inset.left} />
      )}
      {!unsafe && edges.includes('right') && (
        <Inset color={rightInsetColor} right={0} height={screenHeight} width={inset.right} />
      )}
      {!unsafe && edges.includes('bottom') && (
        <Inset color={bottomInsetColor} bottom={0} height={inset.bottom} width={screenWidth} />
      )}
    </>
  );
};

function ScreenWithoutScrolling(
  Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>,
  props: ScreenComponentProps
) {
  // state
  const { colors } = useTheme();
  const {
    statusBarStyle,
    backgroundColor,
    actualUnsafe,
    children,
    edges,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = colors.color_200,
    style = {},
    rightInsetColor = colors.color_200,
    leftInsetColor = colors.color_200,
    name = '',
  } = props;

  // render
  return (
    <ScreenTrack name={name}>
      <Wrapper
        edges={edges}
        style={[styles.inner, style, backgroundColor ? { backgroundColor } : {}]}
      >
        <View style={[styles.flex]} children={children} />
      </Wrapper>
      <InsetComponent
        edges={edges}
        bottomInsetColor={bottomInsetColor}
        statusColor={statusColor}
        statusBarStyle={statusBarStyle}
        hiddenStatusBar={hiddenStatusBar}
        leftInsetColor={leftInsetColor}
        rightInsetColor={rightInsetColor}
        unsafe={actualUnsafe}
      />
    </ScreenTrack>
  );
}

function ScreenWithScrolling(
  Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>,
  props: ScreenComponentProps
) {
  // state
  const { colors } = useTheme();
  const {
    statusBarStyle,
    backgroundColor,
    actualUnsafe,
    children,
    onScroll,
    edges,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = colors.color_200,
    style = {},
    leftInsetColor = colors.color_200,
    rightInsetColor = colors.color_200,
    name = '',
    bounces = true,
  } = props;
  // render
  return (
    <ScreenTrack name={name}>
      <InsetComponent
        edges={edges}
        bottomInsetColor={bottomInsetColor}
        statusColor={statusColor}
        statusBarStyle={statusBarStyle}
        hiddenStatusBar={hiddenStatusBar}
        leftInsetColor={leftInsetColor}
        rightInsetColor={rightInsetColor}
        unsafe={actualUnsafe}
      />
      <Wrapper edges={edges} style={[styles.outer]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          overScrollMode={'never'}
          style={[styles.inner, backgroundColor ? { backgroundColor } : {}]}
          contentContainerStyle={[style]}
          children={children}
          bounces={bounces}
          nestedScrollEnabled
          scrollEnabled
        />
      </Wrapper>
    </ScreenTrack>
  );
}

export const Screen = (props: ScreenProps) => {
  // state
  const edges = useMemo<Edge[]>(
    () => getEdges(props.excludeEdges, props?.hiddenStatusBar ?? false),
    [props.excludeEdges, props.hiddenStatusBar]
  );
  const actualUnsafe = useMemo<boolean>(
    () => props.unsafe || edges.length <= 0,
    [edges.length, props.unsafe]
  );
  const Wrapper = useMemo(() => (actualUnsafe ? View : SafeAreaView), [actualUnsafe]);

  const route = useRoute();
  const focus = useIsFocused();

  useEffect(() => {
    if (props.avoidKeyboardUsingSoftinput && focus) {
      AvoidSoftInput.setAdjustResize();
      AvoidSoftInput.setShowAnimationDuration(100);
      AvoidSoftInput.setShouldMimicIOSBehavior(true);
      AvoidSoftInput.setEnabled(true);
    }
  }, [props.avoidKeyboardUsingSoftinput, focus]);

  useEffect(() => {
    if (props.avoidKeyboardUsingSoftinput && !focus) {
      AvoidSoftInput.setDefaultAppSoftInputMode();
      AvoidSoftInput.setShowAnimationDuration();
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
      AvoidSoftInput.setEnabled(false);
    }
  }, [props.avoidKeyboardUsingSoftinput, focus]);

  // render
  if (props.scroll) {
    return ScreenWithScrolling(Wrapper, { ...props, actualUnsafe, edges });
  } else {
    return ScreenWithoutScrolling(Wrapper, { ...props, actualUnsafe, edges });
  }
};
