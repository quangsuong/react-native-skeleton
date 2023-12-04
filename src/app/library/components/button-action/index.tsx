import { K_FONT_SIZE_NON_13, K_SIZE_16, K_SIZE_20, K_SIZE_32, K_SIZE_8 } from '@common';
import { Button, Spacer, Text } from '@components';
import { Block } from '@components/block';
import { ButtonActionProps } from '@components/button-action/type';
import { IconSvgLocal } from '@components/icon-vec-local';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { useStyle } from './styles';

const Component = (props: ButtonActionProps) => {
  // state
  const styles = useStyle();
  const { colors } = useTheme();

  const {
    icon,
    iconWidth = K_SIZE_32,
    iconHeight = K_SIZE_32,
    iconColor,
    showBadge,
    badge = 0,
    t18n,
    text,
    textColor = colors.color_900,
    fontSize = K_FONT_SIZE_NON_13,
    textStyle,
    marginIcon = K_SIZE_8,
    preset = 'body2',
    name,
    style,
    onPress,
    disable,
  } = props;

  // render
  return (
    <Button name={name} onPress={onPress} disabled={disable} style={style}>
      <Block alignItems={'center'} justifyContent={'center'}>
        <Block height={iconHeight} width={iconWidth}>
          {/*Setup badge*/}
          {showBadge && (
            <Block
              width={K_SIZE_16}
              height={K_SIZE_16}
              borderRadius={K_SIZE_20}
              color={'red'}
              alignItems={'center'}
              justifyContent={'center'}
              style={styles.badge}
            >
              <Text
                text={`${badge}`}
                preset={'caption3'}
                color={colors.color_50}
                center
                numberOfLines={1}
              />
            </Block>
          )}
          {/*Setup icon*/}
          {icon && (
            <IconSvgLocal name={icon} height={iconHeight} width={iconWidth} color={iconColor} />
          )}
        </Block>
        {/*Setup text*/}
        {(text || t18n) && (
          <>
            <Spacer height={marginIcon} />
            <Text
              text={text}
              t18n={t18n}
              center
              preset={preset}
              color={textColor}
              fontSize={fontSize}
              style={textStyle}
            />
          </>
        )}
      </Block>
    </Button>
  );
};

export const ButtonAction = memo(Component, isEqual);
