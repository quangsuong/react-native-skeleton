import { AccountTypeMapping, CURENCY_VND, overdraftPayment } from '@common';

const checkIsOverDraftPayment = (account: any) => {
  return overdraftPayment.findIndex((el) => el.id === account?.accountType + '') > -1;
};

const filterOverDraftPaymentAcc = (listAcc: any[]) => {
  return listAcc.filter(checkIsOverDraftPayment);
};

/**
 * filter danh sach tai khoan
 * return danh sach tai khoan CA hoac OD && ko han che ghi no && ko han che ghi co && tai khoan VND && active
 * postingRestrictId: 1 (hạn chế ghi nợ)
 * postingRestrictId: 1 (hạn chế ghi có)
 * postingRestrictId: 3 (hạn chế cả ghi nợ và ghi có)
 * noCreditAccount chặn tài khoản ghi có hay ko?
 */
const filterOverDraffPaymentFromHTCData = (listAcc: any[], noCreditAccount?: boolean) => {
  return listAcc.filter((e) => {
    const checkCreditAccount = noCreditAccount ? e?.postingRestrictId !== '2' : true; // check xem có chặn tài khoản ghi có không
    return (
      (e.accountType == AccountTypeMapping.CurentAccount ||
        e.accountType == AccountTypeMapping.OrverDraftAccount) &&
      e.currencyCode === CURENCY_VND &&
      e?.postingRestrictId !== '1' &&
      checkCreditAccount &&
      e?.postingRestrictId !== '3' &&
      e?.accountStatus === 'Active'
    );
  });
};

const filterAccAcceptPayemnt = (listAcc: any[]) => {
  return listAcc.filter((e) => {
    return (
      (e.accountType == AccountTypeMapping.CurentAccount ||
        e.accountType == AccountTypeMapping.OrverDraftAccount) &&
      e?.currencyCode === 'VND' &&
      e?.accountStatus === 'Active'
    );
  });
};

const filterAccReceiveMoney = (listAcc: any[]) => {
  return listAcc.filter((e) => {
    return (
      (e.accountType == AccountTypeMapping.CurentAccount ||
        e.accountType == AccountTypeMapping.OrverDraftAccount) &&
      e?.currencyCode === 'VND' &&
      /^(Active|Inactive)$/.test(e?.accountStatus)
    );
  });
};

const accountUtils = {
  checkIsOverDraftPayment,
  filterOverDraftPaymentAcc,
  filterOverDraffPaymentFromHTCData,
  filterAccAcceptPayemnt,
  filterAccReceiveMoney,
};

export default accountUtils;
