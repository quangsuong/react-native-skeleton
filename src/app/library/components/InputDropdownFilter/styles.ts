import {
  K_BORDER_RADIUS_4,
  K_BUTTON_HEIGHT,
  K_FONT_SIZE_16,
  K_PADDING_SCALE_16,
  K_SCREEN_WIDTH,
  K_SIZE_12,
  K_SIZE_16,
  K_SIZE_42,
  K_SIZE_50,
  K_SIZE_56,
  K_SIZE_60,
  sizeScale,
} from '@common';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useInputDropdownFilter = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        modal: { margin: 0, justifyContent: 'flex-end' },
        viewContent: {
          overflow: 'hidden',
        },
        viewHeader: {
          height: K_SIZE_56,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: colors.color_500,
          borderBottomWidth: 1,
          flexDirection: 'row',
        },
        textTitle: {
          color: colors.color_900,
          textAlign: 'center',
        },
        viewSearchInput: {
          paddingHorizontal: sizeScale(16),
        },
        textInput: {
          color: colors.color_900,
          margin: 0,
          padding: 0,
          paddingHorizontal: 10,
          flex: 1,
        },
        viewFlatList: {
          marginTop: K_SIZE_16,
        },
        viewItem: {
          height: K_SIZE_50,
          paddingHorizontal: sizeScale(16),
          flexDirection: 'row',
          alignItems: 'center',
        },
        textItem: {
          marginLeft: K_SIZE_12,
        },
        itemSeparatorComponent: {
          borderBottomColor: colors.color_200,
          borderBottomWidth: 1,
          height: 1,
          marginHorizontal: sizeScale(16),
        },
        viewSelected: { backgroundColor: colors.color_200 },
        viewLoading: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        viewItem_2: { backgroundColor: colors.color_500 },

        viewSelected_2: {
          height: K_SIZE_42,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: K_BORDER_RADIUS_4,
          marginHorizontal: sizeScale(16),
          paddingHorizontal: sizeScale(16),
        },
        search: {
          paddingLeft: sizeScale(40),
          color: colors.color_600,
          height: K_BUTTON_HEIGHT,
          paddingHorizontal: Space.spacing_s,
          paddingVertical: 10,
        },
        inputSearch: {
          backgroundColor: colors.color_50,
          marginBottom: sizeScale(24),
          marginTop: sizeScale(Space.spacing_l),
        },
        input_search: {
          backgroundColor: colors.color_100,
          paddingRight: sizeScale(12),
        },
        header: {
          backgroundColor: colors.color_100,
          paddingHorizontal: sizeScale(16),
          paddingVertical: sizeScale(8),
        },
        content: {
          marginHorizontal: 0,
          width: K_SCREEN_WIDTH,
          paddingBottom: K_SIZE_60,
        },
        noData: {
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: sizeScale(50),
          flex: 0,
        },
        textSearch: {
          fontSize: K_FONT_SIZE_16,
        },
        sectionContentContainer: {
          paddingBottom: K_PADDING_SCALE_16,
        },
      }),
    [colors]
  );
};
