import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { execFunc } from '@common';

import { ActionSheetProps, OptionData } from './type';

import { Text } from '@components/text';
import { Button } from '../button';
import { Divider } from '../divider';
import { Modal } from '../modal';
import useActionSheetStyle from './styles';

export const ActionSheet = forwardRef((props: ActionSheetProps, ref) => {
  // state
  const [t] = useTranslation();
  const {
    title,
    rootStyle,
    onPressCancel,
    wrapCancelStyle,
    textOptionStyle,
    wrapOptionStyle,
    onBackDropPress: onBackDropPressOverwrite,
    textCancelStyle: textCancelStyleOverwrite,
    onPressOption,
    textCancel = t('dialog:cancel'),
    backDropColor = 'rgba(0,0,0,.5)',
    closeOnBackDropPress = true,
    option = [],
  } = props;
  const [actionVisible, setActionVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setActionVisible(true);
      },
      hide: () => {
        setActionVisible(false);
      },
    }),
    []
  );
  // function
  const onPress = useCallback(
    (item: OptionData, index: number) => {
      return () => {
        setActionVisible(false);
        onPressOption && onPressOption(item, index);
      };
    },
    [onPressOption]
  );

  const onCancel = useCallback(() => {
    onPressCancel && onPressCancel();
    setActionVisible(false);
  }, [onPressCancel]);

  const onBackDropPress = useCallback(() => {
    execFunc(onBackDropPressOverwrite);
    if (closeOnBackDropPress) {
      setActionVisible(false);
    }
  }, [closeOnBackDropPress, onBackDropPressOverwrite]);

  const styles = useActionSheetStyle();

  // render
  return (
    <Modal
      style={[styles.modal]}
      hasGesture={false}
      backdropOpacity={1}
      animatedIn={'slideInUp'}
      animatedOut={'slideOutDown'}
      onBackdropPress={onBackDropPress}
      onBackButtonPress={onCancel}
      isVisible={actionVisible}
      backdropColor={backDropColor}
    >
      <View style={[styles.wrap, rootStyle]}>
        <View style={[styles.wrapOption, wrapOptionStyle]}>
          {title &&
            (React.isValidElement(title) ? (
              title
            ) : (
              <>
                <View style={[styles.wrapTitle]}>
                  <Text style={[styles.title]} children={title + ''} preset={'subtitle1'} />
                </View>
                <Divider />
              </>
            ))}
          {option.map((item: OptionData, index: number) => {
            const hasBorder = index < option.length - 1;
            return (
              <Button
                onPress={onPress(item, index)}
                key={item.text}
                name={item.text}
                preset={'subtitle2'}
              >
                <View style={[styles.wrapTextOption, { borderBottomWidth: hasBorder ? 1 : 0 }]}>
                  <Text
                    style={[
                      styles.textDefault,
                      textOptionStyle,
                      item?.destructive ? styles.destructive : {},
                    ]}
                    children={item.text}
                  />
                </View>
              </Button>
            );
          })}
        </View>
        <View style={[styles.wrapCancel, wrapCancelStyle]}>
          <Button name="cancel" onPress={onCancel}>
            <View style={[styles.wrapTextCancel]}>
              <Text
                style={[styles.textCancel, textCancelStyleOverwrite]}
                children={textCancel}
                preset={'subtitle2'}
              />
            </View>
          </Button>
        </View>
      </View>
    </Modal>
  );
});

export interface ActionSheet {
  show(): void;
  hide(): void;
}
