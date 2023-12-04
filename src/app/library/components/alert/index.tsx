import { K_ALERT_WIDTH } from '@common';
import { Block } from '@components/block';
import { Button } from '@components/button';
import { ButtonWithoutFeedback } from '@components/button-without-feedback';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Spacer } from '@components/spacer';
import { Text } from '@components/text';
import { Space } from '@foundation';
import { useDisableBackHandler } from '@hooks';
import { useTheme } from '@theme';
import React, {
  createRef,
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { AlertAction } from './alert-action';
import { useAlertViewStyle } from './styles';
import { AlertProps, stateDefault, TypeMessage } from './type';

const AlertAnimated = Animated.createAnimatedComponent(Block);

const Component = forwardRef((_, ref) => {
  const [state, setState] = useState(stateDefault);

  useImperativeHandle(
    ref,
    () => ({
      show: (props: AlertProps) => {
        if (state?.isShow) return;
        Keyboard.dismiss();
        setState({
          isShow: true,
          ...props,
        });
      },
      hide: () => {
        setState(stateDefault);
      },
    }),
    [state?.isShow]
  );

  const styles = useAlertViewStyle();
  const { colors } = useTheme();

  const isDisableTouchOutSide = useMemo(() => {
    return state.disableTouchOutSide || state?.type === 'confirm';
  }, [state?.type, state.disableTouchOutSide]);

  useDisableBackHandler(state?.isShow, () => {
    if (!isDisableTouchOutSide) {
      hideAlert();
    }
  });

  const onPress = useCallback(
    (index) => {
      hideAlert();
      setTimeout(() => {
        const item = state?.actions[index];
        if (item?.onPress && typeof item?.onPress === 'function') {
          item.onPress();
        }
      }, 250);
    },
    [state?.actions]
  );

  const _onPressBackground = useCallback(() => {
    if (!isDisableTouchOutSide) {
      hideAlert();
    }
  }, [isDisableTouchOutSide]);

  // render
  return state?.isShow ? (
    <AlertAnimated
      pointerEvents={'box-none'}
      entering={FadeIn}
      exiting={FadeOut}
      style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <Block position={'absolute'} style={styles.full} zIndex={0}>
        <ButtonWithoutFeedback
          style={[styles.full, styles.noBackground]}
          onPress={_onPressBackground}
        />
      </Block>
      <Block style={[styles.alert_wrap]}>
        {state.haveCloseBtn && (
          <Button name="hideAlert" style={styles.btn_close} onPress={hideAlert}>
            <IconSvgLocal name="IC_CLOSE" color={colors.color_700} />
          </Button>
        )}
        {state.customHeader}
        {state?.image ? (
          <Block marginBottom={Space.spacing_s}>
            <IconSvgLocal
              name={state?.image?.name}
              width={state?.image?.width || K_ALERT_WIDTH}
              height={state?.image.height}
            />
          </Block>
        ) : null}
        <Block
          padding={Space.spacing_xl}
          paddingTop={state?.image ? 0 : undefined}
          width={K_ALERT_WIDTH}
        >
          <Text center preset={'title4'} color={colors.color_900} text={state.title} />
          <Spacer height={Space.spacing_m} />
          {state.contentComponent ?? (
            <Text
              preset={'body1'}
              color={colors.color_800}
              text={state.content}
              textAlign={'center'}
            />
          )}
          <Spacer height={Space.spacing_xl} />
          <Block direction={state.type === 'confirm' ? 'row' : 'column'}>
            {state.actions?.map((item, index) => {
              return (
                <AlertAction
                  key={index}
                  {...item}
                  typeMessage={state.type}
                  index={index}
                  onPress={() => onPress(index)}
                />
              );
            })}
          </Block>
          {state.footer}
        </Block>
      </Block>
    </AlertAnimated>
  ) : null;
});

type Alert = {
  show: (data: {
    title: string;
    content: string;
    type?: TypeMessage;
    haveCloseBtn?: boolean;
    customHeader?: ReactNode;
    footer?: ReactNode;
  }) => void;
  hide: () => void;
};
export const AlertRef = createRef<Alert>();
export const AlertView = () => <Component ref={AlertRef} />;

export const showAlert = (props: AlertProps) => {
  AlertRef.current?.show(props);
};

export const hideAlert = () => {
  AlertRef.current?.hide();
};
