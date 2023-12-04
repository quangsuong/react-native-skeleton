import { Block, Button, Text } from '@components';
import { BottomSheet } from '@components/bottom-sheet';
import { IconSvgLocal } from '@components/icon-vec-local';
import { useBackHandler } from '@customHooks/useBackHandler';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import React, {
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useStyle } from './styles';

export interface ModalSelectProps {
  title?: I18nKeys;
  data: any[];
  renderItem?: () => any;
  customUI?: ReactNode;
  onChange: (index: number, item: any) => void;
  selectedIndex?: number;
  keyTitleItem?: string;
  keyFlatlist?: string;
}

const Component = (props: ModalSelectProps, ref: any) => {
  const styles = useStyle();
  const { colors } = useTheme();
  const refModal = useRef<BottomSheet>(null);
  const { t } = useTranslation();
  // const [selectedIndex, setSeletedIndex] = useState<number>(props.selectedIndex ?? 0)

  const openModal = useCallback(() => {
    refModal.current?.openBottomSheet();
  }, []);

  const hideModal = useCallback(() => {
    refModal.current?.closeBottomSheet();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      show: openModal,
      hide: hideModal,
    }),
    []
  );

  const handleBackButton = useCallback(() => {
    hideModal();
    return true;
  }, []);
  useBackHandler(handleBackButton);

  const onSelect = useCallback(
    (index, item) => {
      refModal.current?.closeBottomSheet();
      // setSeletedIndex(index)
      props?.onChange?.(index, item);
    },
    [props?.onChange]
  );

  const _renderItem = useCallback(
    ({ item, index }) => {
      const isSelected = props.selectedIndex === index;

      return (
        <Button
          name="pressModalSelect"
          style={styles.item}
          key={item?.bankCode}
          disabled={isSelected}
          onPress={() => onSelect(index, item)}
        >
          <Block paddingVertical={Space.spacing_xs} direction="row">
            <Block flex={1}>
              <Text color={colors.color_900} preset="subtitle2">
                {props?.keyTitleItem ? item[props.keyTitleItem] : item}
              </Text>
            </Block>
            {isSelected && <IconSvgLocal color={colors.color_secondary_500} name="IC_CHECK_FILL" />}
          </Block>
        </Button>
      );
    },
    [props.selectedIndex, onSelect]
  );

  // render
  return (
    <>
      <Button name="openModal" onPress={openModal}>
        {props.customUI ?? <Text>{t(props.title)}</Text>}
      </Button>
      <BottomSheet
        contentStyle={styles.contentModal}
        styleContainer={styles.modalContainer}
        flatlistInside
        title={t(props.title ?? 'text:select_from_acc')}
        ref={refModal}
      >
        <FlatList
          contentContainerStyle={styles.listContainer}
          renderItem={props.renderItem || _renderItem}
          data={props.data}
          keyExtractor={(item) => (props.keyFlatlist ? item?.[props.keyFlatlist] : item.id || item)}
          maxToRenderPerBatch={20}
          onEndReachedThreshold={5}
        />
      </BottomSheet>
    </>
  );
};

export const ModalSelect = memo(forwardRef(Component), isEqual);
