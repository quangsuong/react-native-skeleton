import React, { memo } from 'react';

import { AnimationFiles } from '@assets/animation';
import { sizeScale } from '@common';
import Lottie from 'lottie-react-native';
import isEqual from 'react-fast-compare';

const Component = () => {
  // state
  // const theme = useTheme();
  // render
  return (
    <Lottie
      source={AnimationFiles.loading}
      autoPlay
      loop
      style={{ width: sizeScale(90), height: sizeScale(90) }}
      resizeMode="cover"
    />
  );
};

export const Refreshing = memo(Component, isEqual);
