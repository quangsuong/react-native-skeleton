import { Images } from '@assets/image';
import { Block, Text } from '@components';
import { Button } from '@components/button';
import { LANGUAGE_TYPE } from '@config/type';
import useDebounce from '@customHooks/useDebounce';
import useLanguage from '@customHooks/useLanguage';
import { useToast } from '@customHooks/useToast';
import { useTheme } from '@theme';
import { hapticFire } from '@utils/haptic-utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Animated, { FadeIn, FadeOut, spring } from 'react-native-reanimated';
import { useStyle } from './styles';

interface Props {
  handleOnPress?: Function;
  value?: boolean;
}

const AnimatedBlock = Animated.createAnimatedComponent(Block);

const AnimatedSwitchLang = (props: Props) => {
  const [switchTranslate] = useState(new Animated.Value(0));
  const { language, onPressVn, onPressEn } = useLanguage();
  const [value, setValue] = useState(language === LANGUAGE_TYPE.vi);
  const styles = useStyle();
  const toast = useToast();
  const { t } = useTranslation();
  const { colors } = useTheme();

  useEffect(() => {
    if (!value) {
      spring(switchTranslate, {
        toValue: 38,
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
  }, [switchTranslate, value]);

  const debouncedValue = useDebounce<boolean>(value, 700);
  useEffect(() => {
    debouncedValue ? onPressVn() : onPressEn();
  }, [debouncedValue]);

  const onChange = useCallback(() => {
    hapticFire('impactMedium');
    setValue(!value);
    toast.show(t('text:change_lang_success'));
  }, [value, t]);

  const _renderIcon = useCallback(() => {
    return (
      <FastImage
        style={styles.flag}
        resizeMode={'cover'}
        source={value ? Images.vi_flag : Images.en_flag}
      />
    );
  }, [value]);

  const colorsText = useMemo(() => {
    return colors.color_800;
  }, [colors]);

  return (
    <Button
      name={'switch_theme'}
      activeOpacity={1.0}
      hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
      onPress={onChange}
    >
      <Animated.View style={[styles.containerStyle]}>
        <Block style={styles.txt_wrap} zIndex={0}>
          {!value ? (
            <AnimatedBlock entering={FadeIn} exiting={FadeOut}>
              <Text text={'EN'} preset={'body2'} color={colorsText} />
            </AnimatedBlock>
          ) : (
            <Block />
          )}
          {value ? (
            <AnimatedBlock entering={FadeIn} exiting={FadeOut}>
              <Text text={'VN'} preset={'body2'} color={colorsText} />
            </AnimatedBlock>
          ) : (
            <Block />
          )}
        </Block>
        <Animated.View
          style={[
            styles.circleStyle,
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

export default AnimatedSwitchLang;
