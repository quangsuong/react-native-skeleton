import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';

import { Block, Spacer, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { BorderRadius } from '@foundation';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import { useTranslation } from 'react-i18next';
import { K_PADDING_4, K_SIZE_12, K_SIZE_SCALE_44 } from '../../constant';
import { ModalSelect, ModalSelectProps } from '../ModalSelect';
import { useStyle } from './styles';

interface SelectInputProps extends ModalSelectProps {
  titleT18?: I18nKeys;
  modalRef?: any;
  value?: string;
  placeHolder?: I18nKeys;
}

const Component = ({ titleT18, modalRef, value, placeHolder, ...props }: SelectInputProps) => {
  const { t } = useTranslation();
  const styles = useStyle();
  const { colors } = useTheme();

  const customUI = useMemo(() => {
    return (
      <>
        <Text t18n={titleT18} preset="subtitle4" />
        <Spacer height={K_PADDING_4} />
        <Block
          height={K_SIZE_SCALE_44}
          borderWidth={1}
          borderColor={colors.color_300}
          borderRadius={BorderRadius.border_radius_m}
          direction="row"
          alignItems="center"
          paddingHorizontal={K_SIZE_12}
        >
          <Block flex={1}>
            <Text
              preset="body1"
              text={value ?? t(placeHolder)}
              color={value?.length ? colors.color_800 : colors.color_600}
            />
          </Block>
          <IconSvgLocal name="ICON_ARROW_RIGHT" color={colors.color_900} />
        </Block>
      </>
    );
  }, [value, placeHolder, colors, titleT18]);

  return (
    <>
      <ModalSelect customUI={customUI} title={placeHolder} {...props} />
    </>
  );
};
export const SelectInput = memo(Component, isEqual);
