import { BugsnagUtil, clearSession, dispatch, isIos } from '@common';
import { showAlert } from '@components/alert';
import { TIME_OUT } from '@config/api';
import { ENVConfig } from '@config/env';
import { rxAccept401 } from '@config/regex';
import { ParamsNetwork, ResponseBase } from '@config/type';
import { authenticationActions } from '@redux-slice';
import i18n from '@utils/i18n/i18n';
import { StorageSecure } from '@utils/storage-secure';
import { Utils } from '@utils/utils';
import Axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { getSystemVersion, getUniqueIdSync } from 'react-native-device-info';
import { ApiConstants } from './htc-api';
import {
  handleErrorAxios,
  handleParameter,
  handleParameterUploadFile,
  handleResponseAxios,
} from './htc-helper';
const base64 = require('base-64');

const AxiosInstance = Axios.create({});

AxiosInstance.defaults.timeout = 0;
AxiosInstance.defaults.validateStatus = function (status: number) {
  return /200|401/.test(status.toString());
};

AxiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  config.meta = config?.meta || {};
  config.meta.requestStartedAt = new Date().getTime();
  return config;
});

AxiosInstance.interceptors.response.use(
  async function (response: AxiosResponse) {
    const originalRequest = response.config;
    // await httpMetric.stop();
    if (response?.status === 401) {
      if (rxAccept401.test(originalRequest.url)) {
        return response;
      } else {
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          const tokenRelogin = (await reLogin()).token;
          if (tokenRelogin) {
            originalRequest.headers['X-Kony-Authorization'] = tokenRelogin;
            console.log('====================================');
            console.log('tokenRelogin', tokenRelogin);
            console.log('====================================');
            return await AxiosInstance(originalRequest);
          }
        }
      }

      showAlert({
        title: i18n.t('alert:session_expire'),
        content: i18n.t('error:GW-414'),
        disableTouchOutSide: true,
        actions: [
          {
            title: i18n.t('alert:back_to_login'),
            onPress: clearSession,
          },
        ],
      });
    }

    console.log(
      `Execution time for: ${response.config.url} - ${
        new Date().getTime() - response.config.meta.requestStartedAt
      } ms`
    );
    console.log('response.status', response.status);

    console.log('================response====================');
    console.log(response.data);
    console.log('=================response===================');
    return response;
  },
  async function (error) {
    console.error(
      `Execution time for: ${error.config.url} - ${
        new Date().getTime() - error.config.meta.requestStartedAt
      } ms`
    );
    // const originalRequest = error.config;
    // try {
    //   // const { httpMetric } = error.config.metadata;
    //   // httpMetric.setHttpResponseCode(error.response.status);
    //   // httpMetric.setResponseContentType(error.response.headers['Content-Type']);
    //   // await httpMetric.stop();
    // } catch (error) {
    //   console.log("🚀 ~ file: service.ts ~ line 61 ~ error", error)
    // }

    if (error?.message === 'Network Error') {
      showAlert({
        title: i18n.t('alert:notify'),
        content: i18n.t('text:network_not_connection'),
        actions: [{ title: i18n.t('text:close') }],
      });
      return Promise.reject(error);
    }

    // if (response.data?.result?.responseCode === 'GW999') {
    showAlert({
      title: i18n.t('alert:notify'),
      content: i18n.t('error:UNKNOWN'),
      type: 'confirm',
      actions: [
        {
          title: i18n.t('text:close'),
          type: 'secondary',
        },
        {
          title: i18n.t('text:call_hotline'),
          type: 'primary',
          onPress: () => Utils.callHotline(),
        },
      ],
    });
    // }

    // if (
    //   error &&
    //   error.response &&
    //   (error.response.status === 403) &&
    //   !originalRequest._retry
    // ) {
    //   originalRequest._retry = true;
    //   refreshTokenRequest = refreshTokenRequest
    //     ? refreshTokenRequest
    //     : refreshToken(originalRequest);
    //   const newToken = await refreshTokenRequest;
    //   refreshTokenRequest = null;
    //   if (newToken === null) {
    //     return Promise.reject(error);
    //   }
    //   // dispatch(appActions.setToken(newToken));
    //   // originalRequest.headers[tokenKeyHeader] = newToken;
    //   return AxiosInstance(originalRequest);
    // }
    // if (
    //   error &&
    //   error.response &&
    //   (error.response.status === 403 || error.response.status === 401) &&
    //   !originalRequest._retry
    // ) {
    //   originalRequest._retry = true;
    //   refreshTokenRequest = refreshTokenRequest
    //     ? refreshTokenRequest
    //     : refreshToken(originalRequest);
    //   const newToken = await refreshTokenRequest;
    //   refreshTokenRequest = null;
    //   if (newToken === null) {
    //     return Promise.reject(error);
    //   }
    //   // dispatch(appActions.setToken(newToken));
    //   // originalRequest.headers[tokenKeyHeader] = newToken;
    //   return AxiosInstance(originalRequest);
    // }
    return Promise.reject(error);
  }
);

// // refresh token
// async function refreshToken(originalRequest: Record<string, unknown>) {
//   return AxiosInstance.get(ApiConstants.REFRESH_TOKEN, originalRequest)
//     .then((res: AxiosResponse) => res.data)
//     .catch(() => null);
// }

const basicAuth = base64.encode(`${ENVConfig.HTC_KEY}:${ENVConfig.HTC_SECRET}`);

const defaultHeaders = {
  'X-Kony-App-Key': ENVConfig.HTC_KEY,
  'X-Kony-App-Secret': ENVConfig.HTC_SECRET,
  'client-id': ENVConfig.HTC_CLIENT_ID,
  'X-Kony-ReportingParams': JSON.stringify({
    os: getSystemVersion(),
    dm: '',
    did: getUniqueIdSync(),
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
    aid: 'OnlineBanking',
    aname: 'OnlineBanking',
    chnl: isIos ? 'Apple' : 'android',
    plat: 'web',
    aver: ENVConfig.VERSION_NAME,
    atype: 'spa',
    stype: 'b2c',
    kuid: '1002496540',
    mfaid: 'fe14a445-ed8d-4cc7-927d-f6bd6c0a9fed',
    mfbaseid: '1a8d7d3e-b78e-40a7-8f5d-340e20fda622',
    mfaname: 'DigitalBanking-Composite',
    sdkversion: '9.5.0',
    sdktype: 'js',
    fid: 'frmLogin',
    sessiontype: 'I',
    clientUUID: '1665464363240-dbb1-7c53-6cfe',
    rsid: '1665464424417-5b28-7db2-783f',
    svcid: `login_${ENVConfig.HTC_PROVIDER}`,
  }),
  Authorization: `Basic ${basicAuth}`,
  Cookie:
    'JSESSIONID=BE4CA360BA291474B8E9E63A88AC33D0; 501f23dac76b0acefde613a08aa24ddd=8a72a0f26a10ebecdbd4801243ebfb67; 5a74a239ba9e11961dde68b45abd366c=07c7dff9f7f557fd1a4fb391be85ba82',
};

// base
function Request<T = Record<string, unknown>>(config: AxiosRequestConfig) {
  const headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json',
    ...defaultHeaders,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, TIME_OUT);

  const defaultConfig: AxiosRequestConfig = {
    baseURL: ENVConfig.HTC_ENDPOINT,
    headers,
  };

  const requestHeader = {
    ...headers,
    ...config.headers,
  };

  if (config.headers?.['Authorization'] === null) {
    delete requestHeader['Authorization'];
  }

  console.log('====================================');
  console.log('headers', headers);
  console.log('====================================');

  if (config.headers?.['X-Kony-ReportingParams'] === null) {
    console.log('====================================');
    console.log('remove X-Kony-ReportingParams');
    console.log('====================================');
    delete requestHeader['X-Kony-ReportingParams'];
  }

  const configRequest = {
    ...defaultConfig,
    ...config,
    timeout: 0,
    headers: requestHeader,
    signal: controller.signal,
  };

  if (__DEV__) {
    console.log('+++++++++++++++++ request+++++++++++++++++');
    console.log('configurl', JSON.stringify(configRequest));
    console.log('+++++++++++++++++ request +++++++++++++++++');
  }

  return new Promise<ResponseBase<T> | null>((rs) => {
    AxiosInstance.request(configRequest)
      .then((res: AxiosResponse<T>) => {
        if (timeout) {
          clearTimeout(timeout);
        }
        const result = handleResponseAxios(res);
        console.log('++++++++++++RESPONSE+++++++++++++');
        console.log('+++++', configRequest.url);
        console.log('+++++', result);
        console.log('++++++++++++RESPONSE+++++++++++++');
        rs(result);
      })
      .catch((error: AxiosError<T>) => {
        if (timeout) {
          clearTimeout(timeout);
        }
        BugsnagUtil.notify(error);
        console.log('error', JSON.stringify(error));
        const result = handleErrorAxios(error);
        if (result.status && result.code === 200) {
          rs(result as ResponseBase<T>);
          return;
        }
        // if (result.code === 401) {
        //   showAlert({
        //     title: i18n.t('alert:session_expire'),
        //     content: i18n.t("error:GW-414"),
        //     disableTouchOutSide: true,
        //     actions: [
        //       {
        //         title: i18n.t('alert:back_to_login'),
        //         onPress: clearSession
        //       }
        //     ]
        //   })
        //   rs(null)
        //   return
        // }
        rs(null);
        showAlert({
          title: i18n.t('alert:notify'),
          content: i18n.t('error:haveError'),
          actions: [{ title: i18n.t('text:close') }],
        });
      });
  });
}

// get
async function Get<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'GET'));
}

// post
async function Post<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'POST'));
}

type ParameterPostFormData = AxiosRequestConfig & ParamsNetwork;
// post FormData
async function PostFormData<T>(params: ParamsNetwork) {
  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Basic QURNSU46QURNSU4=',
    ...defaultHeaders,
  };
  return Request<T>(
    handleParameterUploadFile<ParameterPostFormData>({ ...params, headers }, 'POST')
  );
}

// put
async function Put<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'PUT'));
}

// delete
async function Delete<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'DELETE'));
}
export type NetWorkResponseType<T> = (params: ParamsNetwork) => Promise<ResponseBase<T> | null>;

export const HTCservice = {
  Get,
  Post,
  Put,
  Delete,
  PostFormData,
  Request,
};

async function reLogin() {
  const [userId, password] = await StorageSecure.getItems(['K_USER_NAME', 'K_PASS_WORD']);
  const data = {
    UserName: userId,
    Password: password,
    deviceId: getUniqueIdSync(),
  };
  const response = await Post({
    url: ENVConfig.HTC_ROOT + ApiConstants.LOGIN,
    data,
  });
  const token = response?.claims_token?.value || '';
  if (token) {
    dispatch(authenticationActions.setSessionId(token));
  }
  return { token };
}
