import { CustomOmit } from '@common';

export enum UN_AUTHORIZE_SCREEN {
  LOGIN = 'LOGIN',
  NETWORK_LOGGER = 'NETWORK_LOGGER',
}
export enum AUTHORIZE_SCREEN {
  TEMPLATE = 'TEMPLATE',
  HOMEPAGE = 'HOMEPAGE',
}

enum ROOT_SCREEN {
  AUTHORIZE = 'AUTHORIZE',
  UN_AUTHORIZE = 'UN_AUTHORIZE',
}

export const APP_SCREEN = {
  ...ROOT_SCREEN,
  ...UN_AUTHORIZE_SCREEN,
  ...AUTHORIZE_SCREEN,
};

export type UnAuthorizeParamsList = {
  [K in keyof typeof UN_AUTHORIZE_SCREEN]: undefined;
};

export type AuthorizeParamsList = {
  [K in keyof typeof AUTHORIZE_SCREEN]: undefined;
};

export type RootParamsList = {
  [K in keyof typeof ROOT_SCREEN]: undefined;
};

//define pass prop to screen with authorize
type ConfigAuthorizeParamsList = {};

//define pass prop to screen with un-authorize
type ConfigUnAuthorizeParamsList = {};

type OmitListScreen = keyof ConfigAuthorizeParamsList;
type OmitUnauthorizeListScreen = keyof ConfigUnAuthorizeParamsList;

export type RootStackParamList = RootParamsList &
  CustomOmit<UnAuthorizeParamsList, OmitUnauthorizeListScreen> &
  CustomOmit<AuthorizeParamsList, OmitListScreen> &
  OmitListScreen &
  OmitUnauthorizeListScreen;
