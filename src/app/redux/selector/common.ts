import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const selectCommon = createDeepEqualSelector(
  (state: RootState) => state.common,
  (common) => common
);
