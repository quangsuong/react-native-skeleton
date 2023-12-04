import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const selectSOTPstatus = createDeepEqualSelector(
  (state: RootState) => state.app,
  ({ sotpActived, sotpRegistered, sotpBiometric }) => ({
    sotpActived,
    sotpRegistered,
    sotpBiometric,
  })
);
