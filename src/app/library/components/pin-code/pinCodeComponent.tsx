import { K_SCREEN_HEIGHT, sizeScale } from '@common';
import { Block, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { hapticFire } from '@utils/haptic-utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface Button {
  label: string | null;
  isActive: boolean;
}

const buttonsRender: Array<Button> = [
  { label: '1', isActive: false },
  { label: '2', isActive: false },
  { label: '3', isActive: false },
  { label: '4', isActive: false },
  { label: '5', isActive: false },
  { label: '6', isActive: false },
  { label: '7', isActive: false },
  { label: '8', isActive: false },
  { label: '9', isActive: false },
  { label: null, isActive: false },
  { label: '0', isActive: false },
  { label: 'del', isActive: false },
];
export interface PropsPinCode {
  onFillDone?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  textErr?: string;
  lengthOtp?: number;
}

// <PinInputComponent value={'1234'} onFillDone={(value) => {console.log(value)}} />

export const PinCodeComponent = ({
  onFillDone = () => {},
  onChange = () => {},
  value = '',
  textErr = '',
  lengthOtp = 6,
}: PropsPinCode) => {
  const { colors } = useTheme();
  const styles = useStyle();

  const createLisPin = useMemo(() => {
    const data = [];
    while (data.length < lengthOtp) {
      data.push(null);
    }
    return data;
  }, [lengthOtp]);

  const [listPin, setListPin] = useState(createLisPin);
  const [buttons, setButtons] = useState(buttonsRender);
  const pinShake = useSharedValue(0);

  const renderListPin = (value: any) => {
    const valueCopy = value.split('');
    const data = [...listPin];
    data.forEach((e, i) => {
      if (valueCopy[i]) {
        data[i] = valueCopy[i];
      } else {
        data[i] = null;
      }
    });
    setListPin(data);
  };

  useEffect(() => {
    if (textErr) {
      hapticFire('impactMedium');
      startShake();
    }
  }, [textErr]);

  const getValue = (data: any) => {
    let value = '';
    data.forEach((e: any) => {
      if (e !== null) {
        value = value + e;
      }
    });
    return value;
  };

  useEffect(() => {
    renderListPin(value);
  }, [value]);

  const deletePin = () => {
    const data = [...listPin];
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i] !== null) {
        data[i] = null;
        break;
      }
    }
    const value = getValue(data);
    onChange(value);
    setListPin(data);
  };

  const addPin = (value: any) => {
    const data = [...listPin];
    for (let i = 0; i < data.length; i++) {
      if (data[i] === null) {
        data[i] = value;
        break;
      }
    }
    const valueCallBack = getValue(data);
    onChange(valueCallBack);
    if (valueCallBack.length === lengthOtp) {
      onFillDone(valueCallBack);
    }
    setListPin(data);
  };

  const handlePressInput = (value: any) => {
    if (value === 'del') {
      deletePin();
    } else {
      addPin(value);
    }
  };

  const startShake = useCallback(() => {
    pinShake.value = withSequence(
      withTiming(20, { duration: 75 }),
      withTiming(-20, { duration: 75 }),
      withTiming(20, { duration: 75 }),
      withSpring(0, { damping: 50, stiffness: 500, mass: 2.8 })
    );
  }, []);

  const pinShakeAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: pinShake.value }],
    };
  });

  const onPressButton = (index: number, type: 'in' | 'out') => {
    const data = [...buttons];
    data[index].isActive = type == 'in' ? true : false;
    setButtons(data);
  };

  return (
    <View style={[styles.container]}>
      <Block alignItems="center">
        <Animated.View style={[styles.warpdot, pinShakeAnimatedStyles]}>
          {listPin.map((e, index) => {
            return (
              <View
                style={[
                  styles.dot,
                  {
                    marginRight: index === lengthOtp - 1 ? 0 : Space.spacing_xs,
                  },
                  e !== null ? styles.dotActive : {},
                ]}
                key={index}
              />
            );
          })}
          <></>
        </Animated.View>
        <View style={styles.boxTextErr}>
          {textErr && (
            <Text preset="body1" color={colors.color_error_500}>
              {textErr}
            </Text>
          )}
        </View>
      </Block>
      <View style={styles.wrapButtons}>
        {buttons.map((e, index) => {
          return (
            <TouchableWithoutFeedback
              onPressIn={() => onPressButton(index, 'in')}
              onPressOut={() => onPressButton(index, 'out')}
              onPress={() => handlePressInput(e.label)}
              disabled={e.label === null}
              key={index}
            >
              {e.label === 'del' ? (
                <View style={styles.buttonDel}>
                  <IconSvgLocal name="IC_DELETE_OUTLINE" color={colors.color_900} />
                </View>
              ) : (
                <View
                  style={[
                    styles.button,
                    { opacity: e.label === null ? 0 : 1 },
                    {
                      backgroundColor: e.isActive ? colors.color_primary_50 : colors.color_50,
                    },
                  ]}
                >
                  <Text preset={'title2'} color={colors.color_800}>
                    {e.label}
                  </Text>
                </View>
              )}
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const useStyle = () => {
  const { colors } = useTheme();
  const isSmallScreen = K_SCREEN_HEIGHT < 760;
  const widthButton = isSmallScreen ? sizeScale(65) : sizeScale(70);
  const withWrapButtons = isSmallScreen ? sizeScale(240) : sizeScale(260);
  const heightBoxErr = isSmallScreen ? 26 : 46;
  const paddingButton = isSmallScreen ? Space.spacing_s : Space.spacing_m;
  const widthDot = 16;
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          // flexGrow: 1,
          // justifyContent: 'space-between'
        },
        wrapButtons: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: withWrapButtons,
          flexWrap: 'wrap',
        },
        button: {
          width: widthButton,
          height: widthButton,
          borderRadius: widthButton,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: paddingButton,
          borderColor: colors.color_primary_100,
          borderWidth: 1.5,
        },
        buttonDel: {
          width: widthButton,
          height: widthButton,
          borderRadius: widthButton,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: paddingButton,
        },
        warpdot: {
          flexDirection: 'row',
          marginBottom: sizeScale(4),
        },
        dot: {
          width: widthDot,
          height: widthDot,
          borderRadius: widthDot,
          borderWidth: 1,
          borderColor: colors.color_500,
          marginRight: Space.spacing_xs,
          backgroundColor: colors.color_50,
        },
        dotActive: {
          backgroundColor: colors.color_900,
          borderWidth: 0,
        },
        boxTextErr: {
          height: sizeScale(heightBoxErr),
        },
      }),
    [colors]
  );
};
