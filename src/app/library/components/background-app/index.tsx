import { Block } from '@components/block';
import { LocalImage } from '@components/local-image';
import useCustomThemeHook from '@customHooks/useCustomThemeHook';
import { selectAppConfig } from '@redux-selector/app';
import { useTheme } from '@theme';
import React, { memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { Keyboard, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useBackgroundStyle } from './styles';
import { BackgroundProps } from './type';

const BackgroundComponent = (props: BackgroundProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const {
    children,
    turnOnSafe = true,
    gradient = false,
    noTouch = true,
    backgroundColor = colors.color_100,
    style,
    gradients,
    noPaddingBottom = false,
    paddingTop,
    SoureImgBg,
    colorHalfLinear,
    forceUseImage,
  } = props;
  const styles = useBackgroundStyle();
  const { theme } = useSelector(selectAppConfig);
  const _theme = props.customTheme || theme;
  const getPaddingBottom = useMemo(() => {
    return noPaddingBottom ? 0 : insets.bottom;
  }, [insets]);

  const { bgHeader, customStyleImageHeader } = useCustomThemeHook({
    theme: _theme,
    forceUseImage,
  });

  const _renderGradient = () => {
    return (
      <Block flex={1}>
        {gradients && gradients?.length > 0 && !forceUseImage ? (
          <Block style={styles.backround_linnear}>
            <LinearGradient colors={gradients} style={styles.linearBlock} />
            {colorHalfLinear ? <Block color={colorHalfLinear} flex={1} /> : null}
          </Block>
        ) : (
          <>
            {SoureImgBg ? (
              <>{SoureImgBg()}</>
            ) : (
              <LocalImage
                source={bgHeader}
                style={{ ...styles.backround, ...customStyleImageHeader }}
                resizeMode="stretch"
              />
            )}
          </>
        )}
        <View
          style={[
            styles.body,
            turnOnSafe
              ? {
                  paddingBottom: getPaddingBottom,
                  paddingTop: insets.top,
                  paddingHorizontal: insets.left,
                }
              : {},
            style,
          ]}
        >
          {children}
        </View>
      </Block>
    );
  };

  const _renderNonGradient = () => {
    return (
      <Block style={{ flex: 1 }} color={backgroundColor}>
        <View
          style={[
            { flex: 1 },
            turnOnSafe
              ? {
                  paddingBottom: getPaddingBottom,
                  paddingTop: insets.top,
                  paddingHorizontal: insets.left,
                }
              : {},
          ]}
        >
          {children}
        </View>
      </Block>
    );
  };

  const _onPress = useCallback(() => {
    Keyboard.dismiss();
  }, []);
  // render
  return (
    <View style={styles.container}>{gradient ? _renderGradient() : _renderNonGradient()}</View>
  );
};
export const BackgroundApp = memo(BackgroundComponent, isEqual);
