import { K_PADDING_16, K_SIZE_16, K_SIZE_2, K_SIZE_24 } from '@common';
import { Button, Spacer } from '@components';
import { Block } from '@components/block';
import { ButtonItemProps } from '@components/button-item/type';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Text } from '@components/text';
import { useTheme } from '@theme';
import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
import { useStyle } from './styles';

const Component = (props: ButtonItemProps) => {
  // state
  const styles = useStyle();
  const { colors } = useTheme();

  const {
    leftImage,
    leftIcon,
    leftIconWidth = K_SIZE_24,
    leftIconHeight = K_SIZE_24,
    leftComponent,
    leftIconColor = colors.color_primary_500,
    t18n,
    text,
    textColor,
    textStyle,
    marginLeftIcon = K_SIZE_16,
    marginRightIcon = K_SIZE_2,
    preset = 'subtitle1',
    centerComponent,
    rightImage,
    rightIcon,
    rightComponent,
    rightIconWidth = K_SIZE_24,
    rightIconHeight = K_SIZE_24,
    rightIconColor = colors.color_900,
    name,
    style,
    padding = K_PADDING_16,
    focused,
    activeTintColor = colors.color_100,
    onPress,
    disable,
  } = props;

  const renderLeftComponent = useMemo(() => {
    return (
      <>
        {leftComponent ? (
          leftComponent
        ) : leftImage ? (
          <FastImage
            source={leftImage}
            style={{ width: leftIconWidth, height: leftIconHeight }}
            resizeMode={'contain'}
          />
        ) : (
          leftIcon && (
            <IconSvgLocal
              name={leftIcon}
              height={leftIconHeight}
              width={leftIconWidth}
              color={leftIconColor}
            />
          )
        )}
      </>
    );
  }, [leftImage, leftIcon, leftComponent, leftIconWidth, leftIconHeight, leftIconColor]);

  const renderCenterComponent = useMemo(() => {
    return (
      <Block block={true}>
        {centerComponent ? (
          centerComponent
        ) : (
          <Text preset={preset} text={text} t18n={t18n} style={textStyle} color={textColor} />
        )}
      </Block>
    );
  }, [text, t18n, centerComponent]);

  const renderRightComponent = useMemo(() => {
    return (
      <>
        {rightComponent ? (
          rightComponent
        ) : rightImage ? (
          <FastImage
            source={rightImage}
            style={{ width: rightIconWidth, height: rightIconHeight }}
            resizeMode={'contain'}
          />
        ) : (
          rightIcon && (
            <IconSvgLocal
              name={rightIcon}
              height={rightIconHeight}
              width={rightIconWidth}
              color={rightIconColor}
            />
          )
        )}
      </>
    );
  }, [rightImage, rightIcon, rightComponent]);

  // render
  return (
    <Button
      name={name}
      buttonColor={focused ? activeTintColor : ''}
      onPress={onPress}
      disabled={disable}
      style={style}
    >
      <Block direction={'row'} padding={padding}>
        {renderLeftComponent}
        <Spacer width={marginLeftIcon} />
        {renderCenterComponent}
        <Spacer width={marginRightIcon} />
        {renderRightComponent}
      </Block>
    </Button>
  );
};

export const ButtonItem = memo(Component, isEqual);
