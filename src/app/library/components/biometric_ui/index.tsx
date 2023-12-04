import { IconSvgTypes } from '@assets/icon';
import { Block, Button, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { useBioMetricUIStyle } from './styles';

export interface PropsBiometricUI {
  title: I18nKeys;
  des: I18nKeys;
  labelButton: I18nKeys;
  img: IconSvgTypes;
  actionButton?: () => void;
  isRegisterPin?: boolean;
  checkErr?: boolean;
}

const Component = ({ title, des, labelButton, img, actionButton = () => {} }: PropsBiometricUI) => {
  const { colors } = useTheme();
  const styles = useBioMetricUIStyle();
  return (
    <Block flex={1}>
      <Block flex={1} marginHorizontal={Space.spacing_m}>
        <Text preset={'title1'} textAlign={'center'}>
          {title}
        </Text>
        <Block marginTop={Space.spacing_3xl} alignItems="center">
          <IconSvgLocal name={img} />
          <Text
            preset="body3"
            style={styles.text_content}
            color={colors.color_700}
            textAlign={'center'}
          >
            {des}
          </Text>
        </Block>
      </Block>
      <Button
        name="pressLabelButton"
        center
        type="primary"
        text={labelButton}
        style={styles.button}
        onPress={actionButton}
      />
    </Block>
  );
};

export const BiometricUI = memo(Component, isEqual);
