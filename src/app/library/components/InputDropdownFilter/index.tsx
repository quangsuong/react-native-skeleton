/* eslint-disable eqeqeq */
import React, { forwardRef, memo, MutableRefObject, useCallback, useImperativeHandle } from 'react';
import { FlatList, SectionList } from 'react-native';

import { useTranslation } from 'react-i18next';

import { FlatListComponent } from '@components/flatlist-component/FlatlistComponent';
import isEqual from 'lodash/isEqual';

import { BottomSheet } from '@components/bottom-sheet';

import { K_SCREEN_HEIGHT, K_SIZE_SCALE_24, sizeScale } from '@common';
import { Block, Button, Text, TextField } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { useFuse } from '@customHooks/useFuse';
import { useTheme } from '@theme';
import { useInputDropdownFilter } from './styles';
import { IProps } from './type';

import EmptyComponent from '@components/empty';
import { useFilter } from './useFilter';

const InputDropdownFilter = forwardRef<any, IProps>((props, ref) => {
  const {
    title,
    placeholder,
    onEndReached,
    onChangeTextSearch,
    data,
    hideSearch,
    isLoading,
    textLoading,
    renderEmpty,
    listStyle,
    styleSeparator,
    renderBottom,
    sectionList,
    showRightIcon,
    listSelect,
    onPressItem,
    onChangeValue,
    onSetList,
    limit,
  } = props;
  const { colors } = useTheme();
  const styles = useInputDropdownFilter();
  const {
    _option,
    handleSelect,
    onScrollToIndexFailed,
    bottomRef,
    refTFSearch,
    refFlatList,
    onChangeText,
    _onPressClear,
    valueSelected,
    _select,
    onAdd,
    onReduce,
    setValueSelected,
  } = useFilter(listSelect);
  const { hits, onSearch, query, onClose, onClean } = useFuse(
    data,
    _option(sectionList),
    sectionList
  );

  const { t } = useTranslation();
  const onSelected = useCallback(
    (item: any, reduce: boolean) => {
      if (!showRightIcon) {
        bottomRef?.current?.closeBottomSheet();
        return onPressItem(item);
      }

      !sectionList
        ? setValueSelected(reduce ? '' : item?.value)
        : setValueSelected(reduce ? '' : item?.id);
      reduce ? onReduce(item, onSetList) : onAdd(item, limit, onSetList);
      !!onChangeText && onChangeText(item?.title, onSearch, onChangeTextSearch);
      !!onChangeValue && onChangeValue(item);
    },
    [
      showRightIcon,
      sectionList,
      setValueSelected,
      onReduce,
      onSetList,
      onAdd,
      limit,
      onChangeText,
      onSearch,
      onChangeTextSearch,
      onChangeValue,
      bottomRef,
      onPressItem,
    ]
  );
  const renderItem = useCallback(
    ({ item }: any) => (
      <Button
        name="pressItemDropdown"
        onPress={() => handleSelect(item, onSelected)}
        style={[styles.viewItem, item?.value == valueSelected && styles.viewSelected]}
      >
        <Block direction="row" flex={1} justifyContent="space-between">
          <Block>
            <Text style={styles.textItem}>{item?.title}</Text>
          </Block>
          <Block>
            <IconSvgLocal name="IC_PLUS" color={colors.color_900} />
          </Block>
        </Block>
      </Button>
    ),
    [valueSelected, handleSelect, onSelected]
  );

  const renderSection = useCallback(
    ({ item }: any) => {
      return (
        <Button
          name="pressCheckFill"
          onPress={
            item?.navKey || item?.id === 'tranfer'
              ? () => {
                  handleSelect(item, onSelected);
                }
              : undefined
          }
          style={[styles.viewItem]}
        >
          <Block direction="row" flex={1} justifyContent="space-between">
            <Block direction="row" alignItems="center">
              {item?.ic ? (
                <Block>
                  <IconSvgLocal
                    name={item.ic}
                    width={K_SIZE_SCALE_24}
                    height={K_SIZE_SCALE_24}
                    color={colors.color_primary_600}
                    color2={colors.color_900}
                    color3={colors.color_primary_50}
                  />
                </Block>
              ) : null}

              <Text preset="subtitle2" color={colors.color_900} style={styles.textItem}>
                {t(`text:${item?.id}`).replace('\n', ' ')}
              </Text>
            </Block>
            <Block>
              {showRightIcon &&
                (item?.id !== _select(item) ? (
                  <IconSvgLocal name="IC_PLUS" color={colors.color_900} />
                ) : (
                  <IconSvgLocal name="IC_CHECK_FILL" color={colors.color_success_500} />
                ))}
            </Block>
          </Block>
        </Button>
      );
    },
    [handleSelect, t, showRightIcon, _select, onSelected]
  );
  const itemSeparatorComponent = useCallback(
    () => <Block style={[styles.itemSeparatorComponent, styleSeparator]} />,
    [styleSeparator, colors]
  );
  const closeBottomSheet = useCallback(() => {
    bottomRef?.current?.closeBottomSheet();
  }, [bottomRef]);
  const openBottomSheet = useCallback(() => {
    bottomRef?.current?.openBottomSheet();
  }, [bottomRef]);
  useImperativeHandle(ref, () => ({
    onChangeText,
    closeBottomSheet,
    openBottomSheet,
  }));

  const renderSectionHeader = useCallback(
    ({ section: { title } }) => (
      <Block marginHorizontal={0} style={styles.header}>
        <Text color={colors.color_900} preset="subtitle1">
          {t(`text:${title}`)}
        </Text>
      </Block>
    ),
    [colors]
  );

  return (
    <BottomSheet
      scrollViewProps={{
        scrollEnabled: false,
        horizontal: true,
        pinchGestureEnabled: false,
        keyboardShouldPersistTaps: 'handled',
      }}
      onClose={onClose}
      ref={bottomRef}
      title={title}
      adjustToContentHeight={false}
      modalHeight={K_SCREEN_HEIGHT * 0.9}
      contentStyle={styles.content}
    >
      {!hideSearch && (
        <Block style={styles.viewSearchInput}>
          <TextField
            onChangeText={(value) => onChangeText(value, onSearch, onChangeTextSearch)}
            ref={refTFSearch}
            containerStyle={styles.input_search}
            unActiveTintBorderColor={colors.color_100}
            style={styles.search}
            placeholder={placeholder}
            spellCheck={false}
            autoCorrect={false}
            contextMenuHidden={true}
            leftChildren={
              <Block left={sizeScale(14)} position="absolute">
                <IconSvgLocal color={colors.color_600} name="SEARCH_ICON" />
              </Block>
            }
            typeInput="outline"
            rightChildren={
              query ? (
                <Button name="clearSearch" onPress={() => _onPressClear(refTFSearch, onClean)}>
                  <IconSvgLocal
                    name="IC_CLOSE_FILL_BROWN"
                    color={colors.color_600}
                    color2={colors.color_100}
                  />
                </Button>
              ) : null
            }
          />
        </Block>
      )}
      <Block style={[styles.viewFlatList, listStyle]}>
        {isLoading ? (
          <Block style={styles.viewLoading}>
            {!!textLoading && (
              <Text preset="subtitle3" textAlign="center" color={colors.color_900}>
                {textLoading}
              </Text>
            )}
          </Block>
        ) : hits?.length === 0 ? (
          renderEmpty ? (
            renderEmpty
          ) : (
            <EmptyComponent t18nTitle={'text:no_data'} typeEmpty="SERVICE" keySearch={query} />
          )
        ) : sectionList ? (
          <SectionList
            bounces={false}
            sections={hits}
            keyboardShouldPersistTaps={'handled'}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={210}
            renderItem={renderSection}
            renderSectionHeader={renderSectionHeader}
            ItemSeparatorComponent={itemSeparatorComponent}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled
            removeClippedSubviews
            contentContainerStyle={styles.sectionContentContainer}
          />
        ) : (
          <FlatListComponent
            keyboardShouldPersistTaps={'handled'}
            bounces={false}
            ref={refFlatList as MutableRefObject<FlatList>}
            windowSize={210}
            initialNumToRender={50}
            onScrollToIndexFailed={(info) => onScrollToIndexFailed(info, refFlatList)}
            removeClippedSubviews
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            data={hits}
            renderItem={renderItem}
            ItemSeparatorComponent={itemSeparatorComponent}
          />
        )}
        {renderBottom?.()}
      </Block>
    </BottomSheet>
  );
});

export default memo(InputDropdownFilter, isEqual);
