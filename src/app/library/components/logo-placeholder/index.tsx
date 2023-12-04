import { IconSvgs } from '@assets/icon';
import { K_SIZE_SCALE_120 } from '@common';
import { Block } from '@components/block';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { ViewProps } from 'react-native';
import { styles } from './styles';
const { ICON_LOGO } = IconSvgs;

const LogoPlaceHolder = ({ style }: ViewProps) => {
  // render
  return (
    <Block middle style={[styles.container, style]}>
      <ICON_LOGO width={K_SIZE_SCALE_120} height={K_SIZE_SCALE_120} />
    </Block>
  );
};

export const LogoHolder = memo(LogoPlaceHolder, isEqual);
