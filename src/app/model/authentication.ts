import { ResultBase } from '@config/type';

export type FormLoginType = {
  userId: string;
  password: string;
};

export type FormLoginHasProfileType = {
  password: string;
};

export interface AuthenticationState {
  loading: boolean;
  sessionId: string | undefined;
  tempSessionId?: string;
  isUserLoggedOut?: boolean;
}

export interface OTPState {
  loading?: boolean;
  transId?: string;
  errorMessage?: string;
}

export type UserInfoType = {
  username?: string;
  cardId?: string;
  phoneNumber?: string;
  pinNumber?: string;
  identifyNumber?: string;
  accountNumber?: string;
  fullname?: string;
  password?: string;
  otp?: string;
};

export type RegisterType = {
  username?: string;
  cardId?: string;
  phoneNumber?: string;
  pinNumber?: string;
  identifyNumber?: string;
  accountNumber?: string;
  fullname?: string;
  password?: string;
  otp?: string;
  transId?: string;
  challengeId?: string;
  email?: string;
};

export type FormInvestType = {
  amount: string;
  profit_type: string;
  refCode: string;
};

export type CreatePassword = {
  password: string;
  repassword: string;
  oldpassword?: string;
  sessionId?: string;
  oldPassword?: string;
};

export type CreateUsername = {
  username: string;
};

export type ChangePassWordParams = {
  password: string;
  repassword: string;
  oldpassword?: string;
  otp?: string;
  transId?: string;
  challengeId?: string;
  oldPassword?: string;
  sessionId?: string;
  newPassword?: string;
  reNewPassword?: string;
};

export type ForgotPasswordResponse = {
  otp?: string;
  transId?: string;
  challengeId?: string;
  result: ResultDefault;
};

export type ChangeUsernameParams = {
  username: string;
  otp?: string;
  transId?: string;
  challengeId?: string;
};

export type ResultDefault = {
  message: string;
  ok: boolean;
  responseCode: string;
};

export type RequestChangePasswordResponse = {
  challenge: string;
  challengeId: string;
  transId: string;
  result: ResultDefault;
};

export type RequestChangeUsernameResponse = {
  challenge: string;
  challengeId: string;
  transId: string;
  result: ResultDefault;
};

export type Nickname = {
  nickname: string;
};

export interface DataResultLoginFail extends FormLoginType, ResultBase {}

export interface DataCountLoginFailWithPass extends FormLoginType {
  countLoginFail: string;
  time: string;
  timeOpen: number;
}

export type CreateTransfer = {
  to_account: string;
  note: string;
  amount: string;
  accName: string;
};

export type MakeTransferType = {
  transferId: string;
  transId: string;
  challenge: string;
  challengeId: string;
  otp: string;
};

export type AddBenAccType = {
  accountNo: string;
  accountName: string;
  bankCode: string;
  bankName: string;
};

export type MakeOtpResponse = {
  transId: string;
  challengeId: string;
  challenge: string;
  transferId: string;
};
