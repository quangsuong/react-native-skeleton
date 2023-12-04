import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const selectShowMascot = createDeepEqualSelector(
  (state: RootState) => state.others,
  (other) => other.showMascot
);
