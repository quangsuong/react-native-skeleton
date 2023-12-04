import debounce from 'lodash/debounce';
import moment from 'moment';
import React, {
  forwardRef,
  Fragment,
  memo,
  MutableRefObject,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { ActivityIndicator, FlatList, FlatListProps, StyleSheet, View } from 'react-native';
import {
  KeyboardAwareFlatList,
  KeyboardAwareFlatListProps,
} from 'react-native-keyboard-aware-scroll-view';

interface IProps extends FlatListProps<any>, KeyboardAwareFlatListProps<any> {
  isKeyboardAware?: boolean;
  hasNext?: boolean;
}

export const FlatListComponent = memo(
  forwardRef<FlatList, IProps>(
    ({ isKeyboardAware, onEndReached, hasNext, ListFooterComponent, ...rest }, ref) => {
      const keyExtractor = useCallback((_: any, index: number) => index.toString(), []);
      const refFlatList = useRef<FlatList>();

      useImperativeHandle(ref, () => refFlatList.current as FlatList);

      const onScrollToIndexFailed = useCallback(
        (info: { index: number; highestMeasuredFrameIndex: number; averageItemLength: number }) => {
          refFlatList.current?.scrollToOffset({
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
          )();
        },
        []
      );

      const innerRef = useCallback((e: any) => {
        refFlatList.current = e;
      }, []);

      const listFooterComponent = useCallback(
        () =>
          onEndReached ? (
            <View style={[hasNext && styles.listFooterComponent]}>
              {hasNext && <ActivityIndicator />}
            </View>
          ) : (
            <Fragment />
          ),
        [hasNext, onEndReached]
      );

      return isKeyboardAware ? (
        <KeyboardAwareFlatList
          keyExtractor={keyExtractor}
          listKey={moment().valueOf().toString()}
          innerRef={innerRef}
          onScrollToIndexFailed={onScrollToIndexFailed}
          onEndReached={onEndReached}
          ListFooterComponent={ListFooterComponent || listFooterComponent}
          {...rest}
        />
      ) : (
        <FlatList
          keyExtractor={keyExtractor}
          listKey={moment().valueOf().toString()}
          ref={refFlatList as MutableRefObject<FlatList>}
          onScrollToIndexFailed={onScrollToIndexFailed}
          onEndReached={onEndReached}
          ListFooterComponent={ListFooterComponent || listFooterComponent}
          {...rest}
        />
      );
    }
  )
);

const styles = StyleSheet.create({
  listFooterComponent: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
