import { K_BORDER_RADIUS_4, K_FONT_SIZE_12, K_PADDING_2, K_PADDING_5 } from '@common';
import { Block } from '@components/block';
import { Text } from '@components/text';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';

interface Props {
  label?: string;
  color?: string;
}

function StatusComponent(props: Props) {
  const { label, color } = props;
  const { colors } = useTheme();
  return (
    <Block
      color={color || '#00BC3C'}
      borderRadius={K_BORDER_RADIUS_4}
      paddingHorizontal={K_PADDING_5}
      paddingVertical={K_PADDING_2}
    >
      <Text
        text={label || ''}
        preset={'textXSmall'}
        fontSize={K_FONT_SIZE_12}
        color={colors.text}
      />
    </Block>
  );
}

export const Status = memo(StatusComponent, isEqual);
