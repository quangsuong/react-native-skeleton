import { K_IS_IOS } from '@common';
import useMergeState from '@customHooks/useMergeState';
import { useDisableBackHandler } from '@hooks';
import { useTheme } from '@theme';
import { useCallback, useMemo } from 'react';
import { DateTimePickerProps } from './type';

interface StateType {
  date?: Date | undefined;
  actionVisible: boolean;
}

const stateDefault = {
  actionVisible: false,
  date: new Date(),
};

export const useDatePicker = (props: DateTimePickerProps) => {
  const { onPressConfirm, onPressCancel } = props;
  const [state, setState] = useMergeState(stateDefault);
  const { dark } = useTheme();
  const onChangeDateTime = (date?: Date) => {
    setState({ date });
  };

  const setActionVisible = useCallback((actionVisible: boolean) => {
    setState({ actionVisible });
  }, []);

  useDisableBackHandler(state?.actionVisible, () => {
    setState({ actionVisible: false });
  });

  // function
  const onPressClose = useCallback(() => {
    onPressCancel && onPressCancel();
    setActionVisible(false);
  }, [onPressCancel]);

  const _onPressConfirm = useCallback(() => {
    onPressConfirm && onPressConfirm(state?.date);
    setActionVisible(false);
  }, [state?.date]);

  const themeDarkPicker = useMemo(() => {
    if (K_IS_IOS) {
      return !dark;
    } else {
      return false;
    }
  }, [dark]);

  return {
    ...state,
    onChangeDateTime,
    onPressConfirm: _onPressConfirm,
    themeDarkPicker,
    setActionVisible,
    onPressClose,
  };
};
