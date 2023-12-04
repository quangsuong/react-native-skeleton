import { Block, Button, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { useTheme } from '@theme';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { ModalSelect } from '../ModalSelect';
import { useStyle } from './styles';

interface SelectGoldProviderProps {
  data: any[];
  onChange: (index: number, item: any) => void;
  selectedProvider: any;
}

const Component = ({ onChange, selectedProvider, data }: SelectGoldProviderProps) => {
  const styles = useStyle();
  const { colors } = useTheme();
  const refModal = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!selectedProvider) onChange(0, data?.[0]);
  }, [data]);

  const openSelect = useCallback(() => {
    refModal.current?.show();
  }, []);

  const customUI = useMemo(() => {
    return (
      <>
        <Text t18n="text:provider" style={styles.blocTitle} />
        <Button name="choose_provider" onPress={openSelect} style={styles.section}>
          <Block flex={1}>
            <Text color={colors.color_secondary} preset="body1">
              {selectedProvider?.providerName || selectedProvider?.name}
            </Text>
          </Block>
          <IconSvgLocal color={colors.color_900} name="ICON_ARROW_RIGHT" />
        </Button>
      </>
    );
  }, [selectedProvider]);

  return (
    <ModalSelect
      title="text:provider"
      ref={refModal}
      data={data}
      selectedIndex={selectedProvider?.index}
      onChange={onChange}
      customUI={customUI}
      keyTitleItem="name"
      keyFlatlist="id"
    />
  );
};

export const SelectGoldProvider = memo(Component, isEqual);
