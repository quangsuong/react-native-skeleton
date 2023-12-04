import { K_PADDING_16, K_SIZE_SCALE_32, sizeScale } from '@common';
import { Block, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Shadow } from '@components/shadow';
import { useTheme } from '@theme';
import { forwardRef, ReactNode } from 'react';
import CachedSvgUri from '../../svg/CachedSVGUri';
import { useStyles } from './style';

interface ItemProps {
  title: string;
  content?: string;
  logo?: string;
  customLogo?: ReactNode;
}

export type FromToTransferProps = {
  items: ItemProps[];
};

const Component = (props: FromToTransferProps) => {
  const {
    items: [item1, item2],
  } = props;
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <Shadow style={styles.shadowSection}>
      <Block direction="row" alignItems="center">
        <Block width={K_SIZE_SCALE_32} marginRight={K_PADDING_16} alignItems="center">
          <IconSvgLocal width={sizeScale(25)} height={sizeScale(25)} name="IC_PVCB" />
        </Block>
        <Block>
          <Text textTransform="uppercase" numberOfLines={1} preset="subtitle4">
            {item1.title}
          </Text>
          <Text color={colors.color_700} preset="body1">
            {item1.content}
          </Text>
        </Block>
      </Block>
      <Block direction="row" alignItems="flex-end">
        <Block width={K_SIZE_SCALE_32} marginRight={K_PADDING_16} alignItems="center">
          <IconSvgLocal name="IC_THREE_BALLOON" height={sizeScale(20)} width={sizeScale(5)} />
        </Block>
        {/* <Divider color={colors.color_200} /> */}
        <Block marginRight={sizeScale(16)} width={'80%'} color={colors.color_200} height={1} />
      </Block>
      <Block direction="row" alignItems="center" marginTop={sizeScale(8)}>
        <Block width={K_SIZE_SCALE_32} marginRight={K_PADDING_16} alignItems="center">
          {item2.customLogo ?? (
            <CachedSvgUri width={sizeScale(32)} height={sizeScale(32)} uri={item2.logo} />
          )}
        </Block>
        <Block>
          <Text
            style={{ textTransform: 'capitalize' }}
            textTransform="uppercase"
            numberOfLines={1}
            preset="subtitle4"
          >
            {item2.title}
          </Text>
          {item2.content ? (
            <Text color={colors.color_700} preset="body1">
              {item2.content}
            </Text>
          ) : null}
        </Block>
      </Block>
    </Shadow>
  );
};
export default forwardRef(Component);
