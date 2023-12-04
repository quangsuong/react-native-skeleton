import React, { memo, ReactNode, useCallback, useState } from 'react';
import isEqual from 'react-fast-compare';

import { Block, Button, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import { K_PADDING_12, K_PADDING_6 } from '../../constant';
import { useStyle } from './styles';

export interface RowProps {
  title: I18nKeys;
  content: string;
  noNeedBorder?: boolean;
  highlight?: boolean;
  customContent?: ReactNode;
}

export interface TwoColInfoProps {
  data: RowProps[];
  slice?: boolean;
}

const Component = ({ data, slice = false }: TwoColInfoProps) => {
  const { t } = useTranslation();
  const styles = useStyle();
  const { colors } = useTheme();
  const [collapse, setCollapse] = useState(slice);

  const list = !collapse ? data : data.slice(0, 1);
  const content = useCallback(
    (item) =>
      item?.highlight ? (
        <Text text={item.content} preset="subtitle2" color={colors.color_secondary_500} />
      ) : (
        <Text text={item.content} preset="body2" color={colors.color_800} />
      ),
    []
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Block
          direction="row"
          justifyContent="space-between"
          paddingTop={index ? K_PADDING_12 : K_PADDING_6}
          borderBottomWidth={item.noNeedBorder || index === data?.length - 1 ? 0 : 1}
          paddingBottom={index === data?.length - 1 ? 0 : K_PADDING_12}
          borderBottomColor={colors.color_200}
        >
          {item?.highlight ? (
            <Text t18n={item.title} preset="body2" color={colors.color_700} />
          ) : (
            <Text t18n={item.title} preset="body1" color={colors.color_700} />
          )}
          {item?.customContent ? item?.customContent : content(item)}
        </Block>
      );
    },
    [colors]
  );

  return (
    <Block>
      <FlatList
        scrollEnabled={false}
        data={list}
        renderItem={renderItem}
        keyExtractor={(el) => el.title}
      />
      {slice && (
        <Block marginTop={Space.spacing_xs} alignItems="center">
          <Button
            style={styles.button}
            name="detail"
            onPress={() => setCollapse(collapse ? false : true)}
          >
            <Text
              t18n={collapse ? 'text:detail_fee' : 'text:collapse'}
              color={colors.color_link_500}
              preset="body1"
            />
            <IconSvgLocal
              name={collapse ? 'ICON_ARROW_DOWN' : 'ICON_ARROW_UP'}
              color={colors.color_link_500}
            />
          </Button>
        </Block>
      )}
    </Block>
  );
};
export const TwoColInfo = memo(Component, isEqual);
