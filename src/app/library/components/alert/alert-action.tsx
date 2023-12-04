import { K_SIZE_SCALE_20, K_SIZE_SCALE_8 } from '@common';
import { Block } from '@components/block';
import { Button } from '@components/button';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Text } from '@components/text';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import React, { memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { View } from 'react-native';
import { useAlertViewStyle } from './styles';
import { ActionProps } from './type';
import { LinearBtnPriority } from "../../../common/components/LinearBtnPriority";

const Component = (props: ActionProps) => {
  const styles = useAlertViewStyle();
  const { title, onPress, type, typeMessage, index, iconName } = props;
  const { colors } = useTheme();

  const _onPress = useCallback(() => {
    if (onPress && typeof onPress === 'function') {
      onPress(index || 0);
    }
  }, [onPress]);

  const _getStyle = useMemo(() => {
    let style = {};
    switch (type) {
      case 'secondary':
        style = styles.btn_secondary;
        break;
      case 'primary':
        style = styles.btn_primary;
        break;
      case 'link':
        style = styles.btn_link;
        break;
      default:
        style = styles.btn_primary;
        break;
    }
    return style;
  }, [type, typeMessage]);

  const _getContainerStyle = useMemo(() => {
    let margin = {};
    if (typeMessage === 'confirm') {
      if (index !== 0) {
        margin = { marginLeft: Space.spacing_s };
      }
      margin = { ...margin, flex: 1 };
    } else {
      if (index !== 0) {
        margin = { marginTop: Space.spacing_s };
      }
    }
    return {
      ...styles.btn_wrap,
      ...margin,
    };
  }, [typeMessage, index]);

  const _textColorTheme = useMemo(() => {
    switch (type) {
      case 'link':
        return colors.color_link_500;
      case 'secondary':
        return colors.color_900;
      default:
        return colors.color_0;
    }
  }, [type]);

  // render
  return (
    <>
      <Block style={_getContainerStyle}>
        <LinearBtnPriority type={type ?? 'primary'} />
        <Button
          name="alert"
          center
          style={{ ..._getStyle, flexDirection: 'row' }}
          onPress={_onPress}
        >
          {iconName && (
            <View style={{ marginRight: K_SIZE_SCALE_8 }}>
              <IconSvgLocal
                name={iconName}
                width={K_SIZE_SCALE_20}
                height={K_SIZE_SCALE_20}
                color={colors.color_900}
              />
            </View>
          )}
          <Text text={title} preset={'subtitle2'} color={_textColorTheme} />
        </Button>
      </Block>
    </>
  );
};

export const AlertAction = memo(Component, isEqual);
