import { Block, Button, Text, TextField } from '@components';
import { useTheme } from '@theme';

import { K_SCREEN_HEIGHT, K_SIZE_16, sizeScale } from '@common';
import { BottomSheet } from '@components/bottom-sheet';
import EmptyComponent from '@components/empty';
import { FlatListComponent } from '@components/flatlist-component/FlatlistComponent';
import { IconSvgLocal } from '@components/icon-vec-local';
import { InputBaseProps } from '@components/text-field/type';
import { I18nKeys } from '@utils/i18n/locales';
import React, {
  forwardRef,
  Fragment,
  memo,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { KeyboardTypeOptions, Pressable, StyleProp, ViewStyle } from 'react-native';
import { ModalizeProps } from 'react-native-modalize';
import { useBottomDropdown } from './styles';
interface Item {
  name: string;
  id: number | string;
  shortName: string;
}
interface InputDropdownProps extends ModalizeProps {
  fieldName: I18nKeys;
  value: Item;
  placeHolder: string;
  inputStyle?: StyleProp<InputBaseProps>;
  keyboardType?: KeyboardTypeOptions;
  errorMsg?: string;
  isRequire: boolean;
  hideErrorMsg?: boolean;
  disabled: boolean;
  rightIcon?: ReactNode;
  wapperStyle?: StyleProp<ViewStyle>;
  onSelectItem: (e: any) => void;
  loading: boolean;
  header: string;
  data: Item[];
  onEndReached: () => void;
  input?: boolean;
}
const Component = forwardRef<any, InputDropdownProps>((props, ref) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = useBottomDropdown();
  const {
    fieldName,
    value,
    inputStyle,
    keyboardType,
    placeHolder,
    disabled,
    wapperStyle,
    rightIcon,
    isRequire,
    onSelectItem,
    loading,
    data,
    onEndReached,
    header,
    input = true,
    ...rest
  } = props;

  const bottomRef = useRef<any>();

  const showBottom = useCallback(() => {
    bottomRef.current?.openBottomSheet();
  }, []);
  const closeModal = useCallback(() => {
    bottomRef.current?.closeBottomSheet();
  }, []);
  const onSelect = useCallback(
    (item) => {
      !!onSelectItem && onSelectItem(item);
      closeModal();
    },
    [closeModal, onSelectItem]
  );
  useImperativeHandle(ref, () => bottomRef.current);
  const itemSeparatorComponent = useCallback(() => {
    return <Block style={styles.itemSeparatorComponent} />;
  }, []);
  const renderItem = useCallback(
    ({ item, index }) => {
      const colorText = item?.id === value?.id ? colors.color_secondary_500 : colors.color_900;
      return (
        <Button name="selectBottomSheet" onPress={() => onSelect(item)}>
          <Block
            key={item?.id}
            paddingHorizontal={sizeScale(16)}
            direction="row"
            justifyContent="space-between"
            paddingVertical={K_SIZE_16}
          >
            <Block>
              <Text color={colorText} preset="body3">
                {item?.shortName}
              </Text>
            </Block>
            {value?.id === item?.id ? (
              <Block>
                <IconSvgLocal name="IC_CHECK_FILL" color={colors.color_secondary_500} />
              </Block>
            ) : null}
          </Block>
        </Button>
      );
    },
    [onSelect, value?.id]
  );
  const listEmptyComponent = useCallback(() => {
    return !loading ? (
      <EmptyComponent typeEmpty="SERVICE" t18nTitle="text:no_data" />
    ) : (
      <Fragment />
    );
  }, [loading]);

  return (
    <>
      <Block>
        {fieldName ? (
          <Text style={styles.fieldName} preset="subtitle3" color={colors.color_900}>
            {t(fieldName)}
            {!!isRequire && <Text color={colors.error}> *</Text>}
          </Text>
        ) : null}
        <Pressable
          style={[wapperStyle, !input && styles.select_btn]}
          disabled={disabled}
          onPress={showBottom}
        >
          {input ? (
            <TextField
              value={value?.shortName}
              keyboardType={keyboardType ?? 'default'}
              placeholderTextColor={colors.color_600}
              placeholder={placeHolder}
              style={[inputStyle, styles.inputMask]}
              editable={false}
              pointerEvents="none"
              rightChildren={
                <Block paddingRight={sizeScale(6)} justifyContent="center" alignItems="center">
                  {rightIcon || <IconSvgLocal name="ICON_ARROW_RIGHT" color={colors.color_900} />}
                </Block>
              }
              {...rest}
            />
          ) : (
            <Block
              paddingVertical={sizeScale(6)}
              alignItems="center"
              direction="row"
              justifyContent="space-between"
            >
              <Block paddingLeft={sizeScale(12)} paddingRight={sizeScale(4)}>
                <Text preset="body1" color={colors.color_900}>
                  {value?.shortName}
                </Text>
              </Block>
              <Block paddingRight={sizeScale(6)} justifyContent="center" alignItems="center">
                {rightIcon || <IconSvgLocal name="ICON_ARROW_DOWN" color={colors.color_900} />}
              </Block>
            </Block>
          )}
        </Pressable>
      </Block>

      <BottomSheet
        adjustToContentHeight={false}
        modalHeight={K_SCREEN_HEIGHT * 0.5}
        scrollViewProps={{
          scrollEnabled: false,
          horizontal: true,
        }}
        contentStyle={styles.contentStyle}
        ref={bottomRef}
        title={header}
      >
        <FlatListComponent
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={210}
          ItemSeparatorComponent={itemSeparatorComponent}
          ListEmptyComponent={listEmptyComponent}
        />
      </BottomSheet>
    </>
  );
});
export const DropdownInput = memo(Component, isEqual);
