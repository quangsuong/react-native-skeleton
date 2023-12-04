export type ResponseBase<T = any, TStatus = boolean> = {
  code: number;
} & (TStatus extends true
  ? {
      data: T;

      status: true;

      result?: ResultBase;
    }
  : {
      data?: T;
      status: false;

      msg?: string | null;

      result?: ResultBase;
    });

export type ResultBase = {
  message?: string | null;
  ok: boolean;
  responseCode: string;
};
export interface ParamsNetwork {
  url: string;
  params?: Record<string, string | number>;
  path?: Record<string, string | number>;
  data?: Record<string, unknown> | FormData;
  headers?: any;
}

export enum SLICE_NAME {
  APP = 'APP_',
  COMMON = 'COMMON_',
  AUTHENTICATION = 'AUTHENTICATION_',
  SMARTOTP = 'SMARTOTP_',
  ACCOUNT = 'ACOUNT_',
  TRANSFER = 'TRANSFER',
  ONBOARD = 'ONBOARD',
  OTHERS = 'OTHERS',
  GOLD = 'GOLD',
  BILL = 'BILL_',
  SERVICE = 'SERVICE',
  SAVING = 'SAVING_',
  NOTIFICATION = 'NOTIFICATION_',
  LOCATION = 'LOCATION',
}

export enum LANGUAGE_TYPE {
  vi = 'vi',
  en = 'en',
}

export enum THEME_TYPE {
  dark = 'dark',
  default = 'default',
}

export type ValidateMessageObject = {
  keyT: string;
  optionsTx?: Record<string, string | number>;
  options?: Record<string, string | number>;
};
