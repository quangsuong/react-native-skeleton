import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const selectOnboardingIdentify = createDeepEqualSelector(
  (state: RootState) => state.onBoarding,
  (ob) => ob.identifyData
);

export const selectOnboardingInfo = createDeepEqualSelector(
  (state: RootState) => state.onBoarding,
  (ob) => ob.onboardingData
);
