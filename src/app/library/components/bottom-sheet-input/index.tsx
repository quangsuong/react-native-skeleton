import React, { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { IconSvgTypes } from '@assets/icon';
import { K_SCREEN_HEIGHT, K_SCREEN_WIDTH, sizeScale } from '@common';
import { Block, Button, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { BorderRadius, Space } from '@foundation';
import BottomSheet, { useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';
import { useTheme } from '@theme';
import isEqual from 'react-fast-compare';
import { Keyboard, StyleSheet, View, ViewStyle } from 'react-native';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Icon {
  isShow?: boolean;
  name?: IconSvgTypes;
}

type BottomSheetProps = {
  children?: React.ReactNode;
  title?: string;
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
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheetComponent = (propsModal: BottomSheetProps, ref: any) => {
  const {
    title,
    children,
    onClose = () => {},
    styleContainer = {},
    iconLeft = { isShow: false, name: 'IC_ARROW_LEFT' },
    iconRight = { isShow: true, name: 'ICON_CLOSE_BLACK' },
    hideHeader,
    backgroundColor,
    headerStyle,
    iconComponent,
  } = propsModal;

  const styles = useStyle(backgroundColor);
  const inset = useSafeAreaInsets();

  const bottomSheetRefNew = useRef<BottomSheet>(null);
  const [indexBottom, setIndexBottom] = useState(-1);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const { colors } = useTheme();

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const openBottomSheet = () => {
    setIndexBottom(0);
  };

  const closeBottomSheet = () => {
    Keyboard.dismiss();
    bottomSheetRefNew.current?.close();
    setIndexBottom(-1);
    onClose();
  };
  useImperativeHandle(ref, () => ({
    openBottomSheet,
    closeBottomSheet,
  }));

  return (
    <Portal>
      <BottomSheet
        backdropComponent={() => (
          <>
            {indexBottom == 0 && (
              <Block
                style={{
                  backgroundColor: 'rgba(151, 151, 151, 0.25)',
                  height: K_SCREEN_HEIGHT,
                  width: K_SCREEN_WIDTH,
                  position: 'absolute',
                }}
              />
            )}
          </>
        )}
        ref={bottomSheetRefNew}
        index={indexBottom}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        keyboardBlurBehavior="restore"
        keyboardBehavior="interactive"
        enablePanDownToClose={true}
        onChange={(index) => {
          setIndexBottom(index);
        }}
      >
        <Block onLayout={handleContentLayout}>
          <>
            {!hideHeader ? (
              <View style={[headerStyle || styles.boxHeader]}>
                {iconLeft.isShow && (
                  <Button
                    name="closeBottomSheet"
                    forIcon
                    onPress={closeBottomSheet}
                    style={{ position: 'absolute', left: sizeScale(16) }}
                  >
                    <IconSvgLocal
                      name={iconLeft.name ?? 'IC_ARROW_LEFT'}
                      color={colors.color_900}
                    />
                  </Button>
                )}
                <Text preset="title4">{title}</Text>
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
            ) : null}
          </>
          {/* <BottomSheetTextInput placeholder='demo'/>
            <Block height={100}/> */}
          <Block style={styles.boxContent}>{children}</Block>
        </Block>
      </BottomSheet>
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
          marginTop: Space.spacing_xs,
          marginBottom: sizeScale(10),
          backgroundColor: backgroundColor ?? colors.color_50,
          zIndex: 2,
        },
        boxContent: {
          // marginBottom: insets.bottom,
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
}
export declare type BottomSheetInput = Handles;
export const BottomSheetInput = memo(forwardRef(BottomSheetComponent), isEqual);
