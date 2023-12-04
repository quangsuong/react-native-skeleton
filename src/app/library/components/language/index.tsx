import { K_SIZE_SCALE_24 } from '@common';
import { Block, Button, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { useLanguageStyle } from '@components/language/style';
import { LANGUAGE_TYPE } from '@config/type';
import useLanguage from '@customHooks/useLanguage';
import { useTheme } from '@theme';
import { hapticFire } from '@utils/haptic-utils';
import React, { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

const Component = () => {
  const { language, onPressVn, onPressEn } = useLanguage();
  const styles = useLanguageStyle();
  const { colors } = useTheme();

  const onChangeLanguage = useCallback(() => {
    hapticFire('impactMedium');
    language !== LANGUAGE_TYPE.vi ? onPressVn() : onPressEn();
  }, [language]);

  return (
    <Button name="press" onPress={onChangeLanguage}>
      <Block direction={'row'} style={styles.container}>
        <IconSvgLocal
          name={language === LANGUAGE_TYPE.vi ? 'ICON_VN' : 'IC_LANGUAGE_E'}
          width={K_SIZE_SCALE_24}
          height={K_SIZE_SCALE_24}
        />
        <Text preset="caption1" style={styles.text}>
          {language === LANGUAGE_TYPE.vi ? 'VI' : 'En'}
        </Text>
      </Block>
    </Button>
  );
};
export const Language = memo(Component, isEqual);
