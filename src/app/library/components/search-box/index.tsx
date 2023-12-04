import { K_SIZE_4, K_SIZE_SCALE_22 } from '@common';
import { Block } from '@components/block';
import { IconVec } from '@components/icon-vec';
import { Spacer } from '@components/spacer';
import { Text } from '@components/text';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import equals from 'react-fast-compare';
import { styles } from './styles';
import { Props } from './type';

const SearchBoxComponent = (props: Props) => {
  const { colors } = useTheme();
  const { style } = props;
  // render
  return (
    <Block style={[styles.container, style, { backgroundColor: colors.background_transparent }]}>
      <IconVec name={'search'} type={'Feather'} size={K_SIZE_SCALE_22} color={colors.icon} />
      <Spacer width={K_SIZE_4} />
      <Text t18n={'text:search'} preset={'textSmall'} color={colors.sub_content} />
    </Block>
  );
};
export const SearchBox = memo(SearchBoxComponent, equals);
