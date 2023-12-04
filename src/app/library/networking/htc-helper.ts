import {
  FORCE_NOT_SHOW_ERROR,
  getState,
  handleErrorApi,
  K_ERROR_CODE_RESPONE_BLACKLIST_HTC,
  logout,
} from '@common';
import { showAlert } from '@components/alert';
import {
  CODE_SUCCESS,
  CODE_TIME_OUT,
  ERROR_NETWORK_CODE,
  RESULT_CODE_PUSH_OUT,
  STATUS_ERROR_NETWORK,
  STATUS_TIME_OUT,
} from '@config/api';
import { ENVConfig } from '@config/env';
import { ParamsNetwork, ResponseBase } from '@config/type';
import { AppState } from '@model/app';
import { translate } from '@utils/i18n/translate';
import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import {
  getDeviceNameSync,
  getSystemName,
  getSystemVersion,
  getUniqueIdSync,
} from 'react-native-device-info';

const responseDefault: ResponseBase<Record<string, unknown>> = {
  code: -500,
  status: false,
  msg: translate('error:errorData'),
};

export const onPushLogout = async () => {
  logout();
  /**
   * do something when logout
   */
};

export const handleResponseAxios = <T = Record<string, unknown>>(
  res: AxiosResponse<T>
): ResponseBase<T> => {
  if (res?.data) {
    const { data } = res as any;
    const result: any = data?.details ? data?.details : data;
    const code = get(data, 'opstatus', '');
    const errcode = get(data, 'errcode', '') || get(data, 'dbpErrCode', '');
    // show error message with error code
    if (
      !isEmpty(`${errcode}`) &&
      !K_ERROR_CODE_RESPONE_BLACKLIST_HTC.includes(errcode.toString())
    ) {
      const msg = get(result, 'errmsg', '') || get(data, 'dbpErrMsg', '');
      showAlert({
        title: translate('alert:notify'),
        content:
          (translate(`error:${errcode}`) != errcode ? translate(`error:${errcode}`) : msg) +
          `(${errcode})`,
        actions: [{ title: translate('text:close') }],
      });
      return { code: code, status: false, data, msg: msg };
    }

    if (!FORCE_NOT_SHOW_ERROR.some((el) => el === code)) {
      if (code != 0) {
        const message = get(result, 'message', 'errmsg');
        showAlert({
          title: translate('alert:notify'),
          content:
            (translate(`error:${code}`) != code ? translate(`error:${code}`) : message) +
            `(${code})`,
          actions: [{ title: translate('text:close') }],
        });
      }
      if (errcode && !K_ERROR_CODE_RESPONE_BLACKLIST_HTC.includes(errcode.toString())) {
        const message = get(result, 'errmsg', '');
        showAlert({
          title: translate('alert:notify'),
          content:
            (translate(`error:${errcode}`) != errcode ? translate(`error:${errcode}`) : message) +
            `(${errcode})`,
          actions: [{ title: translate('text:close') }],
        });
      }
    }
    return { code: CODE_SUCCESS, status: true, ...res.data, result };
  }
  return responseDefault as ResponseBase<T>;
};
export const handleErrorAxios = <T = Record<string, unknown>>(
  error: AxiosError
): ResponseBase<T> => {
  if (error.code === STATUS_TIME_OUT) {
    // timeout
    return handleErrorApi(CODE_TIME_OUT) as unknown as ResponseBase<T>;
  }
  if (error.code === STATUS_ERROR_NETWORK) {
    return handleErrorApi(ERROR_NETWORK_CODE) as unknown as ResponseBase<T>;
  }
  if (error.response) {
    if (error.response.status === RESULT_CODE_PUSH_OUT) {
      return handleErrorApi(
        RESULT_CODE_PUSH_OUT,
        error.response?.data
      ) as unknown as ResponseBase<T>;
    } else {
      return handleErrorApi(
        error.response.status,
        error.response?.data
      ) as unknown as ResponseBase<T>;
    }
  }
  return handleErrorApi(ERROR_NETWORK_CODE) as unknown as ResponseBase<T>;
};

export const handlePath = (url: string, path: ParamsNetwork['path']) => {
  if (!path || Object.keys(path).length <= 0) {
    return url;
  }
  let resUrl = url;
  Object.keys(path).forEach((k) => {
    resUrl = resUrl.replaceAll(`{${k}}`, String(path[k]));
    resUrl = resUrl.replaceAll(`:${k}`, String(path[k]));
  });
  return resUrl;
};

const deviceInfo = {
  deviceName: getDeviceNameSync(),
  deviceVersion: getSystemVersion(),
  os: getSystemName(),
  // deviceId: getUniqueIdSync(),
  deviceId: getUniqueIdSync(),
  appVersion: ENVConfig.VERSION_NAME,
  clientVersion: ENVConfig.VERSION_CODE,
};

export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method
): AxiosRequestConfig => {
  const { url, path, params, data, headers } = props;
  const { notificationToken }: AppState = getState('app');
  const sessionId =
    getState('authentication').sessionId || getState('authentication').tempSessionId || undefined;
  // ||
  // 'login';

  const deviceIdCommon = notificationToken || '';
  const dataRequest = {
    // sessionId,
    // deviceIdCommon,
    // ...deviceInfo,
    ...data,
  };

  const token = (headers && headers['X-Kony-Authorization']) ?? sessionId;

  const requestHeader = {
    ...headers,
    // mot so api ko can header nay nen truyen rong
    'X-Kony-Authorization': token,
  };

  if (!token || headers?.['X-Kony-Authorization'] === null) {
    delete requestHeader?.['X-Kony-Authorization'];
  }

  return {
    method,
    // url: handlePath(url, path),
    url,
    path,
    data: dataRequest,
    params: { ...params },
    headers: requestHeader,
  };
};

export const handleParameterUploadFile = <T extends ParamsNetwork>(
  props: T,
  method: Method
): AxiosRequestConfig => {
  const { url, path, params, data, headers } = props;
  const { sessionId } = getState('authentication'); //|| 'login';

  // @ts-ignore
  data.append('sessionId', sessionId);
  // @ts-ignore
  data.append('appVersion', deviceInfo.appVersion);
  // @ts-ignore
  data.append('clientVersion', deviceInfo.clientVersion);
  // @ts-ignore
  data.append('deviceId', deviceInfo.deviceId);

  const headersRequest = { headers };

  return {
    method,
    url: handlePath(url, path),
    data: data,
    params: { ...params },
    ...headersRequest,
  };
};

/**
 * generate error message based on TS error case
 * @param orgErrorCode
 * @returns
 */
export const getErrorMessageOfTS = (orgErrorCode: string): string => {
  if (orgErrorCode && !isEmpty(orgErrorCode)) {
    // glare
    if (orgErrorCode.indexOf('glare') >= 0) {
      return translate('error:ob_glare');
    }
    // blur
    if (orgErrorCode.indexOf('image1_blurry') >= 0) {
      return translate('error:ob_blur');
    }
    //non-liveness
    if (orgErrorCode.indexOf('non-liveness') >= 0) {
      return translate('error:ob_non_liveness');
    }
    const msg = translate(`error:${orgErrorCode}`);
    if (!isEmpty(msg)) {
      return msg;
    }
  }
  return translate('error:haveError');
};
