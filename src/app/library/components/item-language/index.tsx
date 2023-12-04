import { IconSvgTypes } from '@assets/icon';
import { sizeScale } from '@common';
import { Block } from '@components/block';
import { Button } from '@components/button';
import { IconSvgLocal } from '@components/icon-vec-local';
import { RadioButton } from '@components/radio-button';
import { Spacer } from '@components/spacer';
import { Text } from '@components/text';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { GestureResponderEvent } from 'react-native';
import { useItemLanguageStyle } from './styles';

interface Props {
  icon: IconSvgTypes;
  title: string;
  active?: boolean;
  underLine?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const Component = (props: Props) => {
  // state
  const { title, active, icon, underLine, onPress, disabled } = props;
  const styles = useItemLanguageStyle();
  const { colors } = useTheme();
  // render
  return (
    <Button name="selectLanguage" onPress={onPress} disabled={disabled}>
      <Block
        style={styles.container}
        borderBottomColor={underLine ? colors.color_200 : 'transparent'}
      >
        <Block flex={1} direction={'row'} alignItems={'center'}>
          <IconSvgLocal name={icon} width={sizeScale(24)} height={sizeScale(24)} />
          <Spacer width={sizeScale(6)} />
          <Text text={title} preset={'body2'} />
        </Block>
        <RadioButton disabled value={active} />
      </Block>
    </Button>
  );
};

export const ItemLanguage = memo(Component, isEqual);
