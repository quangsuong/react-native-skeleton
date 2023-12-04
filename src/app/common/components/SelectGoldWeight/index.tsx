import { useTheme } from '@theme';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { ModalSelect } from '../ModalSelect';
import { useStyle } from './styles';

interface SelectGoldWeightProps {
  data: any[];
  onChangeWeight: (providerIndex: number, index: number, item?: any) => void;
  // selectedIndex: number
  // currentIndex: number
}

const Component = ({ onChangeWeight, data }: SelectGoldWeightProps, ref: any) => {
  const styles = useStyle();
  const { colors } = useTheme();
  const refModal = useRef(null);
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openSelect = useCallback((selectedIndex, currentIndex) => {
    setSelectedIndex(selectedIndex);
    setCurrentIndex(currentIndex);
    refModal.current?.show();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      show: openSelect,
    }),
    []
  );

  const onChange = (index: number, item: any) => {
    onChangeWeight(currentIndex, index, item);
  };

  return (
    <ModalSelect
      title="text:gold_weight"
      ref={refModal}
      data={data}
      customUI={<></>}
      onChange={onChange}
      selectedIndex={selectedIndex}
      keyTitleItem="productName"
      keyFlatlist="productID"
    />
  );
};

export const SelectGoldWeight = memo(forwardRef(Component), isEqual);
