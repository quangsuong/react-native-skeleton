import { ENVConfig } from '@config/env';

const ApiEndPoint = {
  LOGIN: `/authService/100000002/login?provider=${ENVConfig.HTC_PROVIDER}`,
  LOGOUT: '/authService/100000002/logout',
} as const;

const configApi = () => {
  const apiOb: Record<string, string> = {};
  Object.keys(ApiEndPoint).forEach((x) => {
    const valueApi = ApiEndPoint[x as keyof typeof ApiEndPoint];
    apiOb[x] = valueApi; //API_VERSION + valueApi;
  });
  return apiOb;
};

type ApiConstantsType<T> = {
  [a in keyof T]: string;
};

export const ApiConstants = configApi() as ApiConstantsType<typeof ApiEndPoint>;
