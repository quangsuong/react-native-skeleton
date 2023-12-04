import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';
import accountUtils from '@utils/account-utils';

export const selectRefreshing = createDeepEqualSelector(
  (state: RootState) => state?.infoAccount,
  (info) => info.refreshing
);
export const selecIsLoadingAllAccount = createDeepEqualSelector(
  (state: RootState) => state?.infoAccount,
  (info) => info.isLoadingAllAccount
);

export const selectorHasOtp = createDeepEqualSelector(
  (state: RootState) => state?.infoAccount,
  (info) => info.hasOtp
);

export const selectorListAcctCount = createDeepEqualSelector(
  (state: RootState) => state?.infoAccount?.infoAccount,
  (infoAccount) => (infoAccount.lstAcct || []).length
);
export const selectListAccount = createDeepEqualSelector(
  (state: RootState) => state?.infoAccount?.infoAccount,
  (infoAccount) => infoAccount.lstAcct || []
);
export const selectCustomer = createDeepEqualSelector(
  (state: RootState) => state?.infoAccount?.infoAccount,
  (infoAccount) => infoAccount.customer || []
);

export const selectListAccReceiveMoney = createDeepEqualSelector(
  (state: RootState) => state?.infoAccount?.infoAccount,
  (infoAccount) => accountUtils.filterAccReceiveMoney(infoAccount.lstAcct || [])
);
