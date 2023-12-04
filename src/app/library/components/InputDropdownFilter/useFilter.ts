import { BottomSheet } from '@components/bottom-sheet';
import { TextFieldProps } from '@components/text-field/type';
import { useToast } from '@customHooks/useToast';
import { debounce, filter, findIndex } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { ItemList } from './type';

export const useFilter = (listSelect: ItemList[]) => {
  const refFlatList = useRef<FlatList>();
  const bottomRef = useRef<BottomSheet>();
  const refTFSearch = useRef<TextFieldProps>();
  const toast = useToast();
  const { t } = useTranslation();
  const [valueSelected, setValueSelected] = useState<string | number>('');
  const _option = useCallback((sectionList: boolean) => {
    return {
      includeScore: true,
      keys: sectionList ? ['name'] : ['title'],
      matchAllOnEmptyQuery: true,
      minMatchCharLength: 1,
      useExtendedSearch: false,
    };
  }, []);
  const _select = useCallback(
    (item) => {
      let find;
      listSelect.map((e) => {
        if (e?.id === item?.id) {
          find = item?.id;
        }
      });
      return find;
    },
    [listSelect]
  );
  const handleSelect = useCallback(
    (item, onSelected) => {
      if (!onSelected) {
        return;
      }
      if (item?.id === _select(item)) {
        onSelected(item, true);
        return;
      }
      onSelected(item, false);
    },
    [_select]
  );

  const onScrollToIndexFailed = useCallback(
    (
      info: {
        index: number;
        highestMeasuredFrameIndex: number;
        averageItemLength: number;
      },
      ref
    ) => {
      ref.current?.scrollToOffset({
        offset: info.averageItemLength * info.index,
        animated: true,
      });
      debounce(
        () =>
          refFlatList.current?.scrollToIndex({
            index: info.index,
            animated: true,
          }),
        100
      )(); // You may choose to skip this line if the above typically works well because your average item height is accurate.
    },
    []
  );
  const onChangeText = useCallback((value, onSearch, onChangeTextSearch) => {
    onSearch(value);
    !!onChangeTextSearch && onChangeTextSearch(value);
  }, []);
  const _onPressClear = useCallback((ref, onSearch) => {
    ref.current?.clear();
    onSearch('');
  }, []);
  const onReduce = useCallback(
    (item: ItemList, onSetList) => {
      const result = filter(listSelect, (i) => i?.id !== item?.id);
      onSetList?.(result);
    },
    [listSelect]
  );
  const onAdd = useCallback(
    (item: ItemList, limit = 6, onSetList) => {
      const data = listSelect;
      const findItem = findIndex(data, (i) => i?.id === item?.id);
      if (findItem < 0) {
        if (data?.length === limit) {
          toast?.show(t('alert:select_service', { number: limit }), {
            type: 'normal',
          });
          return;
        }
        data?.push(item);
      }
      onSetList?.(data);
    },
    [listSelect, toast]
  );
  return {
    _option,
    handleSelect,
    onScrollToIndexFailed,
    bottomRef,
    refTFSearch,
    refFlatList,
    onChangeText,
    _onPressClear,
    _select,
    valueSelected,
    setValueSelected,
    onReduce,
    onAdd,
  };
};
