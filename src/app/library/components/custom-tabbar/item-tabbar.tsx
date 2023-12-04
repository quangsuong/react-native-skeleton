import { AnimationFiles } from '@assets/animation';
import { IconSvgs } from '@assets/icon';
import { K_SIZE_12, K_SIZE_24 } from '@common';
import { Block } from '@components/block';
import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import { Text } from '@components/text';
import { Space } from '@foundation';
import { useI18nHook } from '@hooks';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';
import { useTheme } from '@theme';
import Lottie from 'lottie-react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

const { IC_HOME_FILL, ICON_SERVICE, ICON_GIFT, ICON_SETTING } = IconSvgs;

interface Props {
  state: TabNavigationState<ParamListBase>;
  index: number;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

function ItemTabbar(props: Props) {
  const animationRef = useRef<Lottie>(null);
  const { state, index, navigation } = props;
  const { t18n } = useI18nHook();
  const { colors } = useTheme();
  const isFocused = useMemo(() => state.index === index, [state]);

  const _onPress = useCallback(() => {
    const route = state.routes[index];
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, { merge: true });
    }
  }, [state, navigation, isFocused]);

  const _disableTabGift = useMemo(() => {
    const route = state.routes[index];
    if (route.name === 'gift') {
      return true;
    }

    return false;
  }, [state.routes]);

  useEffect(() => {
    if (isFocused) {
      animationRef.current?.play(0, 100);
    } else {
      animationRef.current?.reset();
    }
  }, [isFocused]);

  const _routeName = useMemo(() => {
    const routeName = state.routeNames[index];
    return routeName;
  }, [state.routeNames]);

  const _getIconName = useMemo(() => {
    switch (_routeName) {
      case 'service':
        return AnimationFiles.ic_service;
      case 'gift':
        return AnimationFiles.ic_gift;
      case 'setting':
        return AnimationFiles.ic_setting;
      case 'home':
        return AnimationFiles.ic_logo;
      default:
        return AnimationFiles.ic_logo;
    }
  }, [_routeName]);

  const tintColor = useMemo(
    () => (isFocused ? colors.color_900 : colors.color_500),
    [isFocused, colors]
  );

  const _renderIcon = useCallback(() => {
    if (_routeName === 'scan') return <Block />;
    return (
      <Lottie
        ref={animationRef}
        loop={false}
        source={_getIconName}
        style={{ width: K_SIZE_24, height: K_SIZE_24 }}
        resizeMode="cover"
      />
    );
  }, [isFocused, _routeName]);

  return (
    <Button
      name={`TABBAR_${_routeName}`}
      flex={1}
      activeOpacity={0.2}
      onPress={_onPress}
      disabled={_routeName === 'scan'}
      hitSlop={{ left: 16, right: 16 }}
    >
      <Block alignItems="center" paddingVertical={K_SIZE_12} flex={1}>
        <Spacer height={Space.spacing_xs} />
        {_renderIcon()}
        <Spacer height={Space.spacing_2xs} />
        {_routeName !== 'scan' ? (
          <Text
            preset={isFocused ? 'caption1' : 'caption2'}
            text={t18n(`text:${_routeName}`)}
            color={tintColor}
          />
        ) : null}
      </Block>
    </Button>
  );
}

export default ItemTabbar;
