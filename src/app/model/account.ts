export interface LstAcctAccount {
  accountName: string;
  accountNo: string;
  accountType: string;
  accountTypeName: string;
  availableBalance: string;
  branchCode: string;
  branchName: string;
  currencyCode: string;
  effDate: string;
  online: string;
  openDate: string;
  productCode: string;
  nickName: string;
  status: 'Lock' | 'Active' | 'notActive' | any;
  accountID?: string;
  postingRestrictId?: string;
  productId?: string;
}

interface InfoContact {
  customerId: string;
  companyId: string;
  contractId: string;
}
export interface CustomerAccount {
  phone?: string;
  addr?: string;
  cardDate?: string;
  cardId?: string;
  cardPlace?: string;
  cardType?: string;
  cif?: string;
  email?: string;
  gender?: string;
  name?: string;
  phoneNumber?: string;
  status?: string;
  userId?: string;
  avatar?: string;
  bod?: string;
  branchName?: string;
  branhCode?: string;
  contract?: InfoContact;
  customerId?: string;
}

export interface InfoAccount {
  customer: CustomerAccount;
  defaultAccount: string;
  isPriorityCustomer?: boolean;
}

export interface InfoAccountWrap {
  infoAccount: InfoAccount;
}
