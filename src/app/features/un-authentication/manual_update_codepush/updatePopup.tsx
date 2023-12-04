import { Block } from '@components';
import React, {
  createRef,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';

import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { showManualCodePush } from './index';
import { UpdateView } from './update_code_push/UpdateView';

const FadeBlock = Animated.createAnimatedComponent(Block);

const Component = (props: any, ref: any) => {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const processUpdate = useCallback(() => {
    showManualCodePush();
    hide();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      show,
      hide,
    }),
    []
  );

  if (!visible) return null;

  return (
    <FadeBlock entering={FadeIn} exiting={FadeOut} flex={1} style={StyleSheet.absoluteFill}>
      <UpdateView isForce={false} onUpdate={processUpdate} onHide={hide} />
    </FadeBlock>
  );
};

export const _CodePushPopup = memo(forwardRef(Component), isEqual);

export const manualUpdateCodePushRef = createRef<ManualUpdateCodePushRef>();

export const CodePushPopup = () => <_CodePushPopup ref={manualUpdateCodePushRef} />;

export const showManualCodePushPopup = () => {
  manualUpdateCodePushRef.current?.show();
};

export const hideManualCodePushPopup = () => {
  manualUpdateCodePushRef.current?.hide();
};
export interface ManualUpdateCodePushRef {
  show(): void;
  hide(): void;
}
