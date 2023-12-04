/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeType } from '@theme';
import { RemotePackage } from 'react-native-code-push';

export interface AppState {
  Bills: any;
  internetState: boolean;

  loadingApp: boolean;

  showDialog: boolean;

  theme: ThemeType;

  notificationCount: number;

  hideAmount: boolean;
  notificationToken: string | undefined;
  devices: any[];
  deviceLoading: boolean;
  accs: any[]; // ds tai khoan
  sotpActived: boolean;
  sotpRegistered: boolean;
  sotpBiometric: boolean;
  numberOfSignin: number;
  favorites: [];
  codePushVersion: RemotePackage | undefined;
  isPriorityPerson: boolean;
  isShowNetwokLogger: boolean;
}

export interface CommonState extends SupportInfo {
  showIntructionInHome: boolean;
  scanQrBefore: boolean;
  showIntro: boolean;
  language: string;
  loginTransferType: TransferType;
  enableInstruction: boolean; // flag show instruction at home screen
}

export interface SupportInfo {
  hotline: string;
  email: string;
  hotlineVIP: string;
}

export type TransferType = 'other' | 'myself' | 'cardId' | '';

export type BankType = {
  bankCode: string;
  citiadCode: string;
  createdAt: Date;
  fullName: string;
  id: string;
  imgLogo: string;
  napasCode: string;
  codeNapas: string;
  shortName: string;
  status: string;
  updatedAt: Date;
  popular: string;
  description: string;
  accountNumber: string;
  logo?: string;
};

export type CreditUser = {
  transId: string;
  creditSourceName: string;
  balance: [
    {
      amount: string;
    }
  ];
  refNum: string;
  auId: string;
};

export enum TransferTypeEnum {
  NAPAS = 'NAPAS',
  CITAD = 'CITAD',
  PVCB = 'PVCB',
}

export type MonthType = {
  value: string;
  periodTime: string;
  percent: number;
  maturingType: string;
  timeWithdraw: string;
  diffDays: number;
  tempAmount: string;
};

export type MaturingType = {
  title: string;
  code: string;
};

export type BranchType = {
  address: string;
  branchCode: string;
  branchName: string;
  districtCode: string;
  districtName: string;
  districtNameEn: string;
  id: string;
  provinceCode: string;
  provinceName: string;
  provinceNameVn: string;
  status: string;
};

export enum MaturityTypeEnum {
  ROTATION = 'ROTATION',
  NO_ROTATION = 'NO_ROTATION',
}

export type SavingType = {
  renewalCode: any;
  id: string;
  name: string;
  prodCode: string;
  description: string;
  currency: string;
  minOpen: string;
  earlyWithdraw: string;
  status: string;
  period: string;
  rootWithdraw: string;
  depositAcct: string;
  createdAt: string;
  updatedAt: string;
  maturingCode: string;
  savingType: number;
  balance: number;
  productCode: string;
};

export type VoucherType = {
  branchCode: string;
  branchName: string;
  code: string;
  interestRate: Float32Array;
  interestRatePlus: Float32Array;
  maturingType: string;
  minOpen: number;
  productCode: string;
  productName: string;
  term: string;
  timeWithDraw: string;
};

export type CardDueAmount = {
  minimumDue: string;
  paymentDue: string;
  dueDate: Date;
};

export type TransRecent = {
  amount: string;
  transactionDate: string;
  transactionId: string;
  description: string;
  currency: string;
  fromAccountNumber: string;
  fromAccountName: string;
  fromAccountBank: string;
  toAccountNumber: string;
  toAccountName: string;
  toAccountBank: string;
  imgLogo?: string;
};

export type MFAAttributes = {
  securityKey: string;
  sacMaxResendRequestsAllowed: string;
  remainingResendAttempts: string;
  sacCodeLength: string;
  communicationType: string;
  sacPreferenceCriteria: string;
  customerCommunication: {
    phone: [
      {
        masked: string;
        unmasked: string;
        referenceId: string;
      }
    ];
  };
  isMFARequired: string;
  MFAType: string;
  serviceKey: string;
};
