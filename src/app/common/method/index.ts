/* eslint-disable @typescript-eslint/no-explicit-any */
import { Platform } from 'react-native';

import { ERROR_NETWORK_CODE, STATUS_ERROR_NETWORK } from '@config/api';
import { ResponseBase } from '@config/type';
import { authenticationActions } from '@redux-slice';
import { translate as t } from '@utils/i18n/translate';

// import { STORAGE_KEY_TOKEN } from '../constant';
import { AxiosResponse } from 'axios';
import { dispatch } from '../redux';

type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export const onShowErrorBase = (msg: string) => {};
export const onCheckType = (source: any, type: TypesBase): source is TypesBase => {
  return typeof source === type;
};
export const checkKeyInObject = (T: Record<string, unknown>, key: string) => {
  return Object.keys(T).includes(key);
};

export const propsToStyle = (arrStyle: Array<any>) => {
  return arrStyle.filter((x) => x !== undefined && !Object.values(x).some((v) => v === undefined));
};

/**
 * return true when success and false when error
 */
export const handleErrorResponse = (
  response: ResponseBase<any>
): response is ResponseBase<any, true> => {
  if (!response.status) {
    return false;
  }
  return true;
};

export const execFunc = <Fn extends (...args: any[]) => any>(
  func?: Fn,
  ...args: Parameters<Fn>
) => {
  if (onCheckType(func, 'function')) {
    func(...args);
  }
};

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const logout = () => {
  dispatch(authenticationActions.logout());
};

export const clearSession = () => {
  dispatch(authenticationActions.clearSession());
};

const handleData = (responseError: ResponseBase) => {
  console.log('🚀 ~ file: index.ts:73 ~ handleData ~ responseError:', responseError);
  return responseError;
};

export const handleErrorApi = (
  statusParam: number | string,
  data?: AxiosResponse<ResponseBase>
) => {
  let status = statusParam;
  if (status === 'ERR_CANCELED') {
    status = 408;
  }
  if (status === STATUS_ERROR_NETWORK) {
    return handleData({
      code: ERROR_NETWORK_CODE,
      msg: t('error:cannotConnect'),
      status: false,
      result: data?.result,
    });
  }
  switch (status) {
    case ERROR_NETWORK_CODE:
      return handleData({
        code: ERROR_NETWORK_CODE,
        msg: t('text:network_not_connection'),
        status: false,
        result: data?.result,
      });
    case 200:
      return handleData({
        code: status,
        msg: t('error:0'),
        status: false,
        result: data?.result,
      });
    case 400:
      return handleData({
        code: status,
        msg: t('error:400'),
        status: false,
        result: data?.result,
      });
    case 401:
      return handleData({
        code: status,
        msg: t('error:401'),
        status: false,
        result: data?.result,
      });
    case 402:
      return handleData({
        code: status,
        msg: t('error:402'),
        status: false,
        result: data?.result,
      });
    case 403:
      return handleData({
        code: status,
        msg: t('error:403'),
        status: false,
        result: data?.result,
      });
    case 404:
      return handleData({
        code: status,
        msg: t('error:404'),
        status: false,
        result: data?.result,
      });
    case 405:
      return handleData({
        code: status,
        msg: t('error:405'),
        status: false,
        result: data?.result,
      });
    case 406:
      return handleData({
        code: status,
        msg: t('error:406'),
        status: false,
        result: data?.result,
      });
    case 407:
      return handleData({
        code: status,
        msg: t('error:407'),
        status: false,
        result: data?.result,
      });
    case 408:
      return handleData({
        code: status,
        msg: t('error:408'),
        status: false,
        result: data?.result,
      });

    case 409:
      return handleData({
        code: status,
        msg: t('error:409'),
        status: false,
        result: data?.result,
      });
    case 410:
      return handleData({
        code: status,
        msg: t('error:410'),
        status: false,
        result: data?.result,
      });

    case 411:
      return handleData({
        code: status,
        msg: t('error:411'),
        status: false,
        result: data?.result,
      });
    case 412:
      return handleData({
        code: status,
        msg: t('error:412'),
        status: false,
        result: data?.result,
      });

    case 413:
      return handleData({
        code: status,
        msg: t('error:413'),
        status: false,
        result: data?.result,
      });
    case 414:
      return handleData({
        code: status,
        msg: t('error:414'),
        status: false,
        result: data?.result,
      });
    case 415:
      return handleData({
        code: status,
        msg: t('error:415'),
        status: false,
        result: data?.result,
      });
    case 416:
      return handleData({
        code: status,
        msg: t('error:416'),
        status: false,
        result: data?.result,
      });
    case 417:
      return handleData({
        code: status,
        msg: t('error:417'),
        status: false,
        result: data?.result,
      });
    case 500:
      return handleData({
        code: status,
        msg: t('error:500'),
        status: false,
        result: data?.result,
      });
    case 501:
      return handleData({
        code: status,
        msg: t('error:501'),
        status: false,
        result: data?.result,
      });
    case 502:
      return handleData({
        code: status,
        msg: t('error:502'),
        status: false,
        result: data?.result,
      });
    case 503:
      return handleData({
        code: status,
        msg: t('error:503'),
        status: false,
        result: data?.result,
      });
    case 504:
      return handleData({
        code: status,
        msg: t('error:504'),
        status: false,
        result: data?.result,
      });
    case 505:
      return handleData({
        code: status,
        msg: t('error:505'),
        status: false,
        result: data?.result,
      });

    default:
      if (typeof status !== 'number') {
        return;
      }
      if (status > 503) {
        return handleData({
          code: status,
          msg: t('error:serverError'),
          status: false,
          result: data?.result,
        });
      } else if (status < 500 && status >= 400) {
        return handleData({
          code: status,
          msg: t('error:errorOnRequest'),
          status: false,
          result: data?.result,
        });
      } else {
        return handleData({
          code: status,
          msg: t('error:errorOnHandle'),
          status: false,
          result: data?.result,
        });
      }
  }
};
