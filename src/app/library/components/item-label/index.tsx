import { sizeScale } from '@common';
import { Block } from '@components/block';
import { Spacer } from '@components/spacer';
import { Text } from '@components/text';
import { TextPresetNames } from '@components/text/preset';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import React, { memo, ReactNode } from 'react';
import isEqual from 'react-fast-compare';
import { useItemLabelStyle } from './styles';

interface Props {
  title?: string;
  titlePreset?: TextPresetNames;
  t18n?: I18nKeys;
  content?: string;
  contentPreset?: TextPresetNames;
  contentComponent?: ReactNode;
  underLine?: boolean;
}

const Component = (props: Props) => {
  // state
  const { title, t18n, titlePreset, underLine, content, contentComponent, contentPreset } = props;
  const styles = useItemLabelStyle();
  const { colors } = useTheme();
  // render
  return (
    <Block
      style={styles.container}
      borderBottomColor={underLine ? colors.color_200 : 'transparent'}
    >
      <Block direction={'row'} justifyContent={'space-between'}>
        <Text text={title} t18n={t18n} preset={titlePreset ?? 'body1'} color={colors.color_700} />
        <Spacer width={sizeScale(6)} />
        {contentComponent ?? (
          <Text text={content} preset={contentPreset ?? 'body2'} color={colors.color_800} />
        )}
      </Block>
    </Block>
  );
};

export const ItemLabel = memo(Component, isEqual);
