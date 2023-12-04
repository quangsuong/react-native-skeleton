import { getState, handleErrorApi, K_ERROR_CODE_RESPONE_BLACKLIST, logout } from '@common';
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
import { ParamsNetwork, ResponseBase, ResultBase } from '@config/type';
import { AppState } from '@model/app';
import { translate } from '@utils/i18n/translate';
import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import isEmpty from 'lodash/isEmpty';
import replace from 'lodash/replace';
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
  if (res.data) {
    const { data } = res;
    const result = data?.result as ResultBase;
    if (
      result.responseCode !== '00' &&
      !K_ERROR_CODE_RESPONE_BLACKLIST.includes(result.responseCode)
    ) {
      // hiển thị thông báo lỗi

      showAlert({
        title: translate('alert:notify'),
        content:
          (translate(`error:${result.responseCode}`) != result.responseCode
            ? translate(`error:${result.responseCode}`)
            : result.message) + `(${result.responseCode})`,
        actions: [{ title: translate('text:close') }],
      });
    }

    return { code: CODE_SUCCESS, status: true, data: res.data, result };
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
    return handleErrorApi(STATUS_ERROR_NETWORK) as unknown as ResponseBase<T>;
  }
  if (error.code === 'ERR_NETWORK') {
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
  deviceName: replace(getDeviceNameSync(), /[^\w\s]/gi, ''),
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
    getState('authentication').sessionId || getState('authentication').tempSessionId || 'login';

  const deviceIdCommon = notificationToken || '';
  const dataRequest = JSON.stringify({
    sessionId,
    deviceIdCommon,
    ...deviceInfo,
    ...data,
  });
  const headersRequest = headers ? { headers } : {};

  return {
    method,
    url: handlePath(url, path),
    data: dataRequest,
    params: { ...params },
    ...headersRequest,
  };
};

export const handleParameterUploadFile = <T extends ParamsNetwork>(
  props: T,
  method: Method
): AxiosRequestConfig => {
  const { url, path, params, data, headers } = props;
  const sessionId = getState('authentication').sessionId || 'login';

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
