import { K_TIME_SKELETON } from '@common';
import { BorderRadius } from '@foundation';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface Props {
  isLoading?: boolean;
  children: any;
  colors?: any;
}

export const SkeletonWrap = memo((props: Props) => {
  const { children, isLoading = true } = props;
  const { colors: _colors } = useTheme();
  const colors = props.colors || _colors;
  // render
  return (
    <SkeletonPlaceholder
      enabled={isLoading}
      borderRadius={BorderRadius.border_radius_s}
      backgroundColor={colors.color_skeleton_background}
      speed={K_TIME_SKELETON}
      highlightColor={colors.color_skeleton_hightlight}
    >
      {children}
    </SkeletonPlaceholder>
  );
});
