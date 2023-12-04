import { IconSvgTypes } from '@assets/icon';
import { K_SIZE_4, K_WINDOW_WIDTH } from '@common';
import { Block, Button, Spacer, Text } from '@components';
import { BottomSheet } from '@components/bottom-sheet';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Space } from '@foundation';
import { useTheme } from '@theme';

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyle } from './styles';

interface Props {
  listData: any[];
  value?: any;
  placeholder?: string;
  customItem?: (item: any, index: number) => void;
  customLabel?: (item: any, index: number) => void;
  onSelect?: (value: any, item: any) => void;
  itemLabel?: string; // dung để hiển thị listview
  itemKey?: string;
  isTranslation?: boolean;
  titleBotomSheet: string;
  modeNoButton?: boolean;
  onPressSelect?: () => void;
  label?: string;
}

export const SelectComponent = forwardRef(
  (
    {
      listData,
      value,
      onSelect = () => {},
      itemLabel = 'label',
      itemKey = 'value',
      isTranslation = false,
      titleBotomSheet,
      modeNoButton = false,
      onPressSelect = () => {},
      label,
    }: Props,
    ref: any
  ) => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const modalSelect = useRef<BottomSheet>(null);
    const styles = useStyle();

    const [itemSelected, setItemSelected] = useState<any>({});

    const openBottomSheet = () => {
      onPressSelect();
      modalSelect.current?.openBottomSheet();
    };

    const closeBottomSheet = () => {
      modalSelect.current?.closeBottomSheet();
    };

    const handleSelect = (value: any, item: any) => {
      setItemSelected(item);
      closeBottomSheet();
      onSelect(value, item);
    };

    useEffect(() => {
      if (itemSelected && value != itemSelected?.[itemKey]) {
        const data = listData.find((e) => e[itemKey] == value);
        setItemSelected(data);
      }
    }, [value]);

    useImperativeHandle(ref, () => ({
      openBottomSheet,
      closeBottomSheet,
    }));

    return (
      <>
        {!modeNoButton && (
          <Block>
            {label ? (
              <Block marginBottom={K_SIZE_4}>
                <Text preset="subtitle4" color={colors.color_900}>
                  {label}
                </Text>
              </Block>
            ) : null}
            <Button onPress={openBottomSheet} name="pressProviderList" style={styles.container}>
              <Block direction="row" alignItems="center">
                {itemSelected?.icon && <IconSvgLocal name={itemSelected.icon} />}
                <>
                  {itemSelected?.icon && <Spacer width={Space.spacing_xs} />}
                  <Text color={colors.color_800} preset="body1">
                    {/* {!isTranslation
                      ? itemSelected[itemLabel]
                      : t(itemSelected[itemLabel])} */}
                    {value}
                  </Text>
                </>
              </Block>
              <IconSvgLocal name={'ICON_ARROW_RIGHT'} color={colors.color_900} />
            </Button>
          </Block>
        )}
        <BottomSheet
          contentStyle={{
            marginHorizontal: 0,
            width: K_WINDOW_WIDTH,
          }}
          styleContainer={{ backgroundColor: colors.transparent }}
          title={titleBotomSheet}
          ref={modalSelect}
          disableScrollIfPossible={false}
        >
          <>
            {listData.map((e: any, index: number) => {
              return (
                <Button
                  name="selectItemBill"
                  key={index}
                  onPress={() => handleSelect(e[itemKey], e)}
                >
                  <Block
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={Space.spacing_m}
                    style={{
                      backgroundColor:
                        itemSelected?.[itemKey] == e[itemKey] ? colors.color_100 : colors.color_50,
                    }}
                  >
                    <Block direction="row" alignItems="center">
                      {e.icon && <IconSvgLocal name={e.icon as IconSvgTypes} />}
                      <Spacer width={Space.spacing_xs} />
                      {itemKey ? (
                        <Text color={colors.color_900} preset="subtitle2">
                          {t(e[itemKey])}
                        </Text>
                      ) : null}
                    </Block>
                    {itemSelected?.[itemKey] == e[itemKey] && (
                      <IconSvgLocal name={'IC_CHECK_FILL'} color={colors.color_secondary_500} />
                    )}
                  </Block>
                </Button>
              );
            })}
          </>
        </BottomSheet>
      </>
    );
  }
);
interface Handles {
  openBottomSheet: () => {};
  closeBottomSheet: () => {};
}
export declare type SelectComponent = Handles;
