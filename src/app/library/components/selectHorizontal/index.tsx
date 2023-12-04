import { Block, Button, Text } from '@components';
import { useTheme } from '@theme';
import React, { memo, useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { FlatList, ViewStyle } from 'react-native';
import { useStyle } from './styles';

interface Iprops {
  listData: Array<any>;
  value?: string;
  onSelect?: (value: string, item: any) => void;
  objectKey?: string;
  objectLabel?: string;
  styleContainer?: ViewStyle;
  disable?: boolean;
}

export const SelectHorizontal = memo(
  ({
    listData,
    onSelect,
    value,
    objectKey = 'value',
    objectLabel = 'label',
    styleContainer = {},
    disable = false,
  }: Iprops) => {
    const refPlatList = useRef<FlatList<any>>(null);
    const { colors } = useTheme();
    const [selected, setSelect] = useState(value);

    const selectOptionSearch = (item: any, index: number) => {
      setSelect(item[objectKey]);
      onSelect && onSelect(item[objectKey], item);
      refPlatList.current?.scrollToIndex({ index: index });
    };
    useEffect(() => {
      if (value != selected) {
        setSelect(value);
      }
    }, [value]);

    const styles = useStyle();
    if (listData.length == 0) return <></>;

    const colorPrimarySelected = colors.color_primary_700;
    const bgSelected = colors.color_primary_50;

    return (
      <Block style={{ ...styles.container, ...styleContainer }}>
        <FlatList
          // eslint-disable
          ref={refPlatList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={listData}
          renderItem={({ item, index }) => (
            <Button
              disabled={disable}
              name="selectHorizontalItem"
              onPress={() => selectOptionSearch(item, index)}
              key={index}
              style={[
                styles.itemOptionSearch,
                {
                  borderColor:
                    selected == item[objectKey] ? colors.color_primary_500 : colors.color_300,
                },
                {
                  backgroundColor: selected == item[objectKey] ? bgSelected : colors.color_50,
                },
              ]}
            >
              <Text
                preset="body1"
                color={selected == item[objectKey] ? colorPrimarySelected : colors.color_900}
              >
                {item[objectLabel]}
              </Text>
            </Button>
          )}
          keyExtractor={(item) => item[objectKey]}
        />
      </Block>
    );
  },
  isEqual
);
