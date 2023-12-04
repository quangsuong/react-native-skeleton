import { K_SIZE_40, K_SIZE_SCALE_40 } from '@common';
import { Button } from '@components/button';
import { IconSvgLocal } from '@components/icon-vec-local';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
import { useAvatarStyle } from './styles';
import { AvatarProps } from './type';

const AvatarComponent = (props: AvatarProps) => {
  const { size, disabled, source, style } = props;
  const { colors } = useTheme();
  const styles = useAvatarStyle(props);

  // render
  return (
    // <Block borderRadius={(size || K_SIZE_SCALE_40)} overflow={'hidden'}>
    <Button name="updateAvatar" disabled={disabled} style={[styles.container, style]}>
      {!source?.uri ? (
        <IconSvgLocal
          name={'IC_PERSON'}
          width={size ? (size * 4) / 9 : K_SIZE_40 / 2}
          height={size ? (size * 4) / 9 : K_SIZE_40 / 2}
          color={colors.color_400}
        />
      ) : (
        <FastImage
          source={source}
          style={{
            width: (size || K_SIZE_SCALE_40) - 3,
            height: (size || K_SIZE_SCALE_40) - 3,
            borderRadius: 100,
          }}
        />
      )}
    </Button>
    // </Block>
  );
};
export const Avatar = memo(AvatarComponent, isEqual);
