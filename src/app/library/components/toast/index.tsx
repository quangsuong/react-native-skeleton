import { K_SIZE_24 } from '@common';
import { Spacer, Text } from '@components';
import { Block } from '@components/block';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { View } from 'react-native';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';
import { useToastStyle } from './styles';

interface Props extends ToastProps {
  showIcon?: boolean;
}
export const Component = (props: Props) => {
  const { message, icon, style, textStyle, type, showIcon = true } = props;
  const styles = useToastStyle();
  const { colors } = useTheme();

  const IconType = useMemo(() => {
    return {
      normal: (
        <IconSvgLocal
          width={K_SIZE_24}
          height={K_SIZE_24}
          name={'IC_CHECK'}
          color={colors.color_success_500}
        />
      ),
      danger: (
        <IconSvgLocal
          width={K_SIZE_24}
          height={K_SIZE_24}
          name={'IC_DANGER'}
          color={colors.color_error_500}
        />
      ),
      info: (
        <IconSvgLocal
          width={K_SIZE_24}
          height={K_SIZE_24}
          name={'ICON_INFO'}
          color={colors.color_link_500}
        />
      ),
      //  | "success" | "danger" | "warning"
    };
  }, []);

  const Icon = () => {
    return useMemo(() => {
      // @ts-ignore
      return icon || IconType[type || 'normal'];
    }, [icon, type]);
  };
  // render
  return (
    <View style={styles.wrapContainer}>
      <Block
        style={[styles.container, style, { backgroundColor: `${colors.color_0}E6` }]}
        direction={'row'}
      >
        {showIcon && (
          <>
            <Icon />
            <Spacer width={Space.spacing_s} />
          </>
        )}

        <View style={styles.wrapText}>
          <Text preset={'body2'} color={colors.color_1000} numberOfLines={3} style={[textStyle]}>
            {message}
          </Text>
        </View>
      </Block>
    </View>
  );
};

export const ToastView = memo(Component, isEqual);
