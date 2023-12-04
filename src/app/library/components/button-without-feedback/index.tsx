import { Block } from '@components/block';
import useTracking from '@customHooks/useButton';
import { useCallback } from 'react';
import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';

interface Props extends TouchableWithoutFeedbackProps {
  name?: string;
}
export const ButtonWithoutFeedback = (props: Props) => {
  const { name } = props;
  const { onPressTracking, showFeatureDeveloping } = useTracking({
    ...props,
    action: name,
  });
  // state
  const { children, onPress, style } = props;

  const _onTap = useCallback(
    (event: GestureResponderEvent) => {
      if (typeof onPress === 'function') {
        onPress(event);
      } else {
        showFeatureDeveloping();
      }
      onPressTracking();
    },
    [onPress]
  );

  // render
  return (
    <TouchableWithoutFeedback onPress={_onTap}>
      <Block style={style}>{children}</Block>
    </TouchableWithoutFeedback>
  );
};
