import useMergeState from '@customHooks/useMergeState';
import { useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';

const stateDefault = {
  width: 0,
  height: 0,
};

export const useComponentSize = () => {
  const [size, setSize] = useMergeState(stateDefault);
  const onLayout = useCallback((event: LayoutChangeEvent): void => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return { size, onLayout };
};
