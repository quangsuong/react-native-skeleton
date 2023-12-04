import { K_SIZE_12, K_SIZE_SCALE_12, K_SIZE_SCALE_14, sizeScale } from '@common';
import { Block } from '@components';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

const Component = ({ children }) => {
  const { colors } = useTheme();
  const [t] = useTranslation();
  return (
    <Block
      color={colors.color_100}
      alignItems="center"
      direction="row"
      marginVertical={sizeScale(12)}
      borderRadius={K_SIZE_12}
      paddingHorizontal={K_SIZE_SCALE_12}
      paddingVertical={K_SIZE_SCALE_14}
    >
      {children}
    </Block>
  );
};
export default memo(Component, isEqual);
