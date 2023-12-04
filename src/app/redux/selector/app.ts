import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const selectAppConfig = createDeepEqualSelector(
  (state: RootState) => state.app,
  (app) => ({
    loadingApp: app.loadingApp,
    showDialog: app.showDialog,
    theme: app.theme,
  })
);

export const selectSessionId = createDeepEqualSelector(
  (state: RootState) => state.authentication,
  (app) => app.sessionId
);

export const selectTempSessionId = createDeepEqualSelector(
  (state: RootState) => state.authentication,
  (app) => app.tempSessionId
);

export const selectNotifcationCount = createDeepEqualSelector(
  (state: RootState) => state.app,
  (app) => app.notificationCount
);

export const selectHideAmount = createDeepEqualSelector(
  (state: RootState) => state.app,
  (app) => app.hideAmount
);

export const selectInfoAccount = createDeepEqualSelector(
  (state: RootState) => state?.infoAccount,
  (app) => app?.infoAccount
);

export const selectIsUserLoggedOut = createDeepEqualSelector(
  (state: RootState) => state.authentication,
  (app) => app.isUserLoggedOut
);

export const selectDevices = createDeepEqualSelector(
  (state: RootState) => state.app,
  (app) => ({
    devices: app.devices,
    loading: app.deviceLoading,
  })
);

export const selectIntructionInHome = createDeepEqualSelector(
  (state: RootState) => state.common,
  (common) => common.showIntructionInHome
);

export const selectEnableIntruction = createDeepEqualSelector(
  (state: RootState) => state.common,
  (common) => common.enableInstruction
);

export const selectScanQrBefore = createDeepEqualSelector(
  (state: RootState) => state.common,
  (common) => common.scanQrBefore
);

export const selectTransferTypeFromLogin = createDeepEqualSelector(
  (state: RootState) => state.common,
  (common) => common.loginTransferType
);

export const selectShowIntro = createDeepEqualSelector(
  (state: RootState) => state.common,
  (common) => !common.showIntro
);

export const selectLanguage = createDeepEqualSelector(
  (state: RootState) => state.common,
  (common) => common.language
);

export const selectNumOfSignin = createDeepEqualSelector(
  (state: RootState) => state.app,
  (app) => app.numberOfSignin
);
export const selectDeviceMfaDTO = createDeepEqualSelector(
  (state: RootState) => state.infoAccount,
  (app) => app.authDeviceMfaDTO
);

export const selectFavorites = createDeepEqualSelector(
  (state: RootState) => state.app,
  (app) => app.favorites
);

export const selectProcessSync = createDeepEqualSelector(
  (state: RootState) => state.others,
  (other) =>
    other.processSync?.totalBytes > 0
      ? Math.ceil((other.processSync?.receivedBytes * 100) / other.processSync?.totalBytes)
      : 0
);

export const selectStatusUpdateApp = createDeepEqualSelector(
  (state: RootState) => state.others,
  (other) => other.statusUpdateApp
);

export const selectSttForcecUpdateApp = createDeepEqualSelector(
  (state: RootState) => state.others,
  (other) => other.sttForcecUpdateApp
);

export const selectCodePushVersion = createDeepEqualSelector(
  (state: RootState) => state.app,
  (other) => other.codePushVersion
);
export const selectSotp = createDeepEqualSelector(
  (state: RootState) => state.app,
  (app) => app.sotpActived
);
