import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { useTheme } from '@theme';

import { K_BORDER_WIDTH_1 } from '@common';
import { Colors } from '@foundation';
import { DividerProps } from './type';

export const Divider = ({
  height = K_BORDER_WIDTH_1,
  colorTheme,
  color = Colors.color_500,
}: DividerProps) => {
  // state
  const theme = useTheme();

  // style
  const divider = useMemo<ViewStyle>(
    () => ({
      backgroundColor: colorTheme ? theme.colors[colorTheme] : color,
      height,
      width: '100%',
    }),
    [color, colorTheme, height, theme.colors]
  );

  // render
  return <View style={[divider]} />;
};
