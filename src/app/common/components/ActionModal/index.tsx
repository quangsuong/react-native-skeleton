import { Block, Button, Spacer, Text } from '@components';
import { BottomSheet } from '@components/bottom-sheet';
import { IconSvgLocal } from '@components/icon-vec-local';
import useActionModal from '@customHooks/useActionModal';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { sizeScale } from '../../scale';
import { useTransferStyle } from './style';

export interface ItemProps {
  title: I18nKeys;
  icon: string;
  onPress: () => void;
}

export type ActionModalProps = {
  title: I18nKeys;
  items: ItemProps[];
};

const ActionModal = (props: ActionModalProps, ref: any) => {
  const { colors } = useTheme();
  const [t] = useTranslation();
  const styles = useTransferStyle();
  const { modalizeRef } = useActionModal(props, ref);
  const { items } = props;

  return (
    <>
      <BottomSheet title={t(props.title)} ref={modalizeRef}>
        <Block>
          {items?.map((item, index) => (
            <Button
              key={index}
              name="option"
              onPress={item.onPress}
              style={[styles.btn, index === items?.length - 1 ? {} : styles.border]}
            >
              <Block direction="row" alignItems="center">
                <Block
                  height={sizeScale(40)}
                  width={sizeScale(40)}
                  borderRadius={sizeScale(20)}
                  color={colors.color_100}
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconSvgLocal
                    name={item.icon}
                    height={sizeScale(24)}
                    width={sizeScale(24)}
                    color={colors.color_900}
                  />
                </Block>
                <Spacer width={Space.spacing_xs} />
                <Text preset="subtitle2" color={colors.color_900} t18n={item.title} />
              </Block>
              <IconSvgLocal name="ICON_ARROW_RIGHT" color={colors.color_700} />
            </Button>
          ))}
        </Block>
      </BottomSheet>
    </>
  );
};
export default forwardRef(ActionModal);
