export const rxEmail = new RegExp(
  '^[a-zA-Z0-9]+([%\\^&\\-\\=\\+\\,\\.]?[a-zA-Z0-9]+)@[a-zA-Z]+([\\.]?[a-zA-Z]+)*(\\.[a-zA-Z]{2,3})+$'
);
export const rxPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{8,}$/;

export const rxPhoneNumber = /^0\d{9}$/;
export const rxLightStatusBar = /dark|priority/;

export const regexTransactionId = /^\d{4,30}$/;

export const rxAccept401 =
  /100000002\/login|100000002\/logout|verifyOTPPreLogin|requestOTPPreLogin|requestLoginOtp/;
export const regexPvcberAcc = /^1027$/;
