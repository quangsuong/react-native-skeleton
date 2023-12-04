import { IconSvgs } from '@assets/icon';
import { useTheme } from '@theme';
import React, { useMemo } from 'react';
import { IconSvgLocalProps } from './type';

export const IconSvgLocal = (props: IconSvgLocalProps) => {
  const { name } = props;
  const { colors } = useTheme();
  const Icon = useMemo(() => {
    return IconSvgs[name];
  }, [name, colors]);
  //render
  return <Icon color={colors.color_primary_500} color2={colors.color_900} {...props} />;
};
