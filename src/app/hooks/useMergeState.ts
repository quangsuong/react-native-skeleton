import { useCallback, useState } from 'react';

function isSimpleObject(value: any): boolean {
  return !!value && value.constructor === Object;
}

function useMergeState<T>(initialState?: T) {
  const [mergeState, setMergeState] = isSimpleObject(initialState)
    ? useState<T>(initialState as T)
    : useState<Partial<T>>();

  const setState = useCallback((newState: Partial<T>) => {
    if (isSimpleObject(newState)) {
      setMergeState((state: any) => ((state as T) ? { ...state, ...newState } : newState));
    }
  }, []);

  return [mergeState, setState] as [T | undefined, typeof setMergeState];
}

export default useMergeState;
