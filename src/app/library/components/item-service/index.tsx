import { IconSvgTypes } from '@assets/icon';
import { K_SIZE_SCALE_24, sizeScale } from '@common';
import { Block, Button, Spacer, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { SkeletonWrap } from '@components/skeleton-wrap';
import { BorderRadius, Space } from '@foundation';
import { useTheme } from '@theme';
import { ReactNode, useMemo } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export type ItemCategoryProps = {
  icon: IconSvgTypes;
  label: string;
  id: string;
  onPress?: Function | undefined;
  isLoading?: boolean;
  customIcon?: ReactNode;
};

export const ItemService = (props: ItemCategoryProps) => {
  // state
  const { icon, onPress, label, isLoading = true, customIcon } = props;
  const { colors } = useTheme();

  const iconBlock = useMemo(() => {
    if (!icon) return null;
    return (
      <IconSvgLocal
        name={icon}
        width={K_SIZE_SCALE_24}
        height={K_SIZE_SCALE_24}
        color={colors.true_tone_1}
        color2={colors.true_tone_2}
      />
    );
  }, [icon, colors]);

  if (isLoading) {
    return (
      <Block height={sizeScale(74)} justifyContent={'center'} minWidth={sizeScale(74)}>
        <SkeletonWrap>
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item
              width={sizeScale(32)}
              height={sizeScale(32)}
              borderRadius={BorderRadius.border_radius_3xl}
            />
            <SkeletonPlaceholder.Item
              width={80}
              height={16}
              marginTop={Space.spacing_xs}
              borderRadius={BorderRadius.border_radius_s}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonWrap>
      </Block>
    );
  }
  // render
  return (
    <Button name="pressItemService" onPress={onPress}>
      <Block
        alignItems={'center'}
        minWidth={sizeScale(74)}
        marginTop={Space.spacing_l}
        marginBottom={Space.spacing_s}
      >
        {/* <Block color={colors.color_100} padding={Space.spacing_s} borderRadius={100}> */}
        {iconBlock}
        {/* </Block> */}
        {customIcon}
        <Spacer height={Space.spacing_xs} />
        <Text textAlign={'center'} text={label} preset={'body2'} color={colors.color_900} />
      </Block>
    </Button>
  );
};
