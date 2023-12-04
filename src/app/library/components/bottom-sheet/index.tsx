import { IconSvgTypes } from '@assets/icon';
import { sizeScale } from '@common';
import { Button, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { BorderRadius } from '@foundation';
import { useTheme } from '@theme';
import React, { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Keyboard, NativeScrollPoint, StyleSheet, View, ViewStyle } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Icon {
  isShow?: boolean;
  name?: IconSvgTypes;
}
export interface PropsModal extends ModalizeProps {
  title?: string;
  titleColor?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  styleContainer?: ViewStyle;
  iconLeft?: Icon;
  iconRight?: Icon;
  contentStyle?: ViewStyle;
  hideHeader?: boolean;
  backgroundColor?: string;
  headerStyle?: ViewStyle;
  iconComponent?: () => void;
  handleStyle?: ViewStyle;
  flatlistInside?: boolean;
  inputInside?: boolean;
}

const BottomSheetComponent = (propsModal: PropsModal, ref: any) => {
  const {
    title,
    titleColor,
    children,
    onClose = () => {},
    styleContainer = {},
    adjustToContentHeight = true,
    iconLeft = { isShow: false, name: 'IC_ARROW_LEFT' },
    iconRight = { isShow: true, name: 'ICON_CLOSE_BLACK' },
    contentStyle,
    hideHeader,
    backgroundColor,
    headerStyle,
    iconComponent,
    handleStyle,
    flatlistInside,
  } = propsModal;
  const modalizeRef = useRef<Modalize>(null);

  const [isShadownHeader, setShadownHeader] = useState(false);
  const [isClose, setClose] = useState(false);
  const insets = useSafeAreaInsets();

  const openBottomSheet = () => {
    setClose(false);
    modalizeRef.current?.open();
    Keyboard.dismiss();
  };

  const closeBottomSheet = () => {
    onClose();
    setClose(true);
    modalizeRef.current?.close();
  };

  const getCloseState = () => {
    return isClose;
  };

  useImperativeHandle(ref, () => ({
    openBottomSheet,
    closeBottomSheet,
    getCloseState,
  }));
  const { colors } = useTheme();
  const styles = useStyle(backgroundColor);

  const onScrollHandle = (point: NativeScrollPoint) => {
    const { y } = point;
    let isShow = false;
    if (y < 1) {
      isShow = false;
    } else {
      isShow = true;
    }
    isShow != isShadownHeader && setShadownHeader(isShow);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      //@ts-ignore
      return React.cloneElement(child, { closeBottomSheet, isClose });
    }
    return child;
  });

  const additionalScrollViewProps = useMemo(() => {
    return flatlistInside
      ? {
          scrollEnabled: false,
          horizontal: true,
        }
      : {};
  }, []);

  //IMPROVE: haidv1 HeaderComponent cần convert sang function sử dụng useCallback hoặc useMemo
  return (
    <Portal>
      <Modalize
        adjustToContentHeight={adjustToContentHeight}
        keyboardAvoidingOffset={propsModal.keyboardAvoidingOffset ?? -insets.bottom}
        ref={modalizeRef}
        modalStyle={[styles.modal, iconComponent ? styles.colorModal_two : styles.colorModal_one]}
        handlePosition={'inside'}
        handleStyle={handleStyle || styles.handleStyle}
        onClose={onClose}
        closeAnimationConfig={{
          timing: {
            duration: 200,
          },
        }}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          onScroll: (e) => onScrollHandle(e.nativeEvent.contentOffset),
          keyboardShouldPersistTaps: propsModal.inputInside ? 'always' : 'handled',
          ...additionalScrollViewProps,
        }}
        HeaderComponent={
          !hideHeader ? (
            <View style={[headerStyle || styles.boxHeader]}>
              {iconLeft.isShow && (
                <Button
                  name="closeBottomSheet"
                  forIcon
                  onPress={closeBottomSheet}
                  style={{ position: 'absolute', left: sizeScale(16) }}
                >
                  <IconSvgLocal name={iconLeft.name ?? 'IC_ARROW_LEFT'} color={colors.color_900} />
                </Button>
              )}
              <Text preset="title4" color={titleColor ? titleColor : colors.title}>
                {title}
              </Text>
              {iconRight.isShow && (
                <Button
                  name="closeBottomSheet"
                  forIcon
                  onPress={closeBottomSheet}
                  style={{ position: 'absolute', right: sizeScale(16) }}
                >
                  <IconSvgLocal
                    name={iconRight.name ?? 'ICON_CLOSE_BLACK'}
                    color={colors.color_900}
                  />
                </Button>
              )}
            </View>
          ) : null
        }
        {...propsModal}
      >
        <View>{iconComponent ? iconComponent() : null}</View>
        <View style={[styles.wrapBox, styleContainer]}>
          <View style={[styles.boxContent, contentStyle]}>{childrenWithProps}</View>
        </View>
      </Modalize>
    </Portal>
  );
};

const useStyle = (backgroundColor: string | undefined) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return useMemo(
    () =>
      StyleSheet.create({
        modal: {
          justifyContent: 'flex-end',
          flexDirection: 'column',
          backgroundColor: backgroundColor ?? colors.color_50,
        },
        wrapBox: {
          borderTopLeftRadius: BorderRadius.border_radius_xl,
          borderTopRightRadius: BorderRadius.border_radius_xl,
          paddingBottom: insets.bottom,
        },
        boxHeader: {
          // ...BASE_THEME.boxShadown,
          alignItems: 'center',
          height: sizeScale(34),
          marginTop: sizeScale(28),
          paddingBottom: sizeScale(10),
          backgroundColor: backgroundColor ?? colors.color_50,
          zIndex: 2,
        },
        boxContent: {
          marginHorizontal: sizeScale(16),
          marginTop: sizeScale(14),
          marginBottom: sizeScale(16),
        },
        handleStyle: {
          backgroundColor: colors.color_300,
          width: sizeScale(48),
          height: sizeScale(4),
          borderRadius: sizeScale(24),
        },
        colorModal_one: {
          backgroundColor: backgroundColor ?? colors.color_50,
        },
        colorModal_two: {
          backgroundColor: colors.transparent,
        },
      }),
    [colors]
  );
};

interface Handles {
  openBottomSheet: () => {};
  closeBottomSheet: () => {};
  getCloseState: () => boolean;
}
export declare type BottomSheet = Handles;
export const BottomSheet = memo(forwardRef(BottomSheetComponent), isEqual);
