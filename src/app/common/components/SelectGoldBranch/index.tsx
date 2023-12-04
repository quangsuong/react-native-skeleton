import { Block, Button, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { useTheme } from '@theme';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { ModalSelect } from '../ModalSelect';
import { useStyle } from './styles';

interface SelectGoldBranchProps {
  data: any[];
  onChange: (index: number, item: any) => void;
  selectedProvider: any;
}

const Component = ({ onChange, selectedProvider, data }: SelectGoldBranchProps) => {
  const styles = useStyle();
  const { colors } = useTheme();
  const refModal = useRef(null);
  const { t } = useTranslation();

  const openSelect = useCallback(() => {
    refModal.current?.show();
  }, []);

  useEffect(() => {
    if (!selectedProvider) onChange(0, data[0]);
  }, []);

  const customUI = useMemo(() => {
    return (
      <>
        <Text t18n="text:gold_branch_recieve" style={styles.blocTitle} />
        <Button name="choose_provider" onPress={openSelect} style={styles.section}>
          <Block flex={1}>
            <Text color={colors.color_secondary} preset="body1">
              {selectedProvider?.branchName}
            </Text>
          </Block>
          <IconSvgLocal color={colors.color_900} name="ICON_ARROW_RIGHT" />
        </Button>
      </>
    );
  }, [selectedProvider]);

  const selectedIndex = useMemo(() => {
    return data.findIndex((el) => el.branchID === selectedProvider?.branchID);
  }, [data, selectedProvider]);

  return (
    <ModalSelect
      title="text:gold_branch_recieve"
      ref={refModal}
      data={data}
      selectedIndex={selectedIndex}
      onChange={onChange}
      customUI={customUI}
      keyTitleItem="branchName"
      keyFlatlist="branchID"
    />
  );
};

export const SelectGoldBranch = memo(Component, isEqual);
