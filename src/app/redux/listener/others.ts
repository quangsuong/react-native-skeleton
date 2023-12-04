import { NotifiableError } from '@bugsnag/react-native';
import { BugsnagUtil } from '@common';
// import { hideLoading, showLoading } from '@components';
import { showAlert } from '@components/alert';
import { ENVConfig } from '@config/env';
import { hideManualCodePush } from '@features/un-authentication/manual_update_codepush';
import { takeLatestListeners } from '@listener';
import { reset } from '@navigation/navigation-service';
import { appActions, OthersActions, SttForcecUpdateApp } from '@redux-slice';
import { translate as t } from '@utils/i18n/translate';
import { Platform } from 'react-native';
import CodePush, { DownloadProgress } from 'react-native-code-push';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

takeLatestListeners(true)({
  actionCreator: OthersActions.syncCodePush,
  effect: async (action, listenerApi) => {
    try {
      const forceRestart = action?.payload?.forceRestart;
      CodePush.disallowRestart();
      CodePush.sync(
        {
          deploymentKey: Platform.select({
            ios: ENVConfig.CODEPUSH_KEY_IOS,
            android: ENVConfig.CODEPUSH_KEY_ANDROID,
          }),
          installMode: CodePush.InstallMode.IMMEDIATE,
        },
        (status) => {
          if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
            if (forceRestart) {
              listenerApi.dispatch(OthersActions.restartApp());
            }
          } else if (
            status === CodePush.SyncStatus.UPDATE_IGNORED ||
            status === CodePush.SyncStatus.UNKNOWN_ERROR
          ) {
            setTimeout(() => {
              showAlert({
                title: t('alert:notify'),
                content: t('error:haveError'),
                type: 'confirm',
                actions: [
                  {
                    title: t('alert:try_again'),
                  },
                ],
              });
            }, 500);
          }
          listenerApi.dispatch(OthersActions.setStatusUpdateApp(status));
        },
        (process: DownloadProgress) => {
          listenerApi.dispatch(OthersActions.setStatusSyncCodepush(process));
        }
      );
    } catch (error) {
      BugsnagUtil.notify(error as NotifiableError);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: OthersActions.restartApp,
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(OthersActions.resetCodePushState());
    hideManualCodePush();
    LottieSplashScreen.show();
    setTimeout(() => {
      reset('RESTART_SCREEN');
    }, 200);
    setTimeout(() => {
      CodePush.notifyAppReady();
      CodePush.allowRestart();
      CodePush.restartApp();
    }, 600);
  },
});

takeLatestListeners(true)({
  actionCreator: OthersActions.showAlert,
  effect: (_action, listenerApi) => {
    showAlert({
      title: t('alert:notify'),
      content: t('text:functions_in_development'),
      type: 'confirm',
      actions: [
        {
          title: t('text:close'),
        },
      ],
    });
  },
});

takeLatestListeners(true)({
  actionCreator: OthersActions.checkUpdateCodePush,
  effect: (_action, listenerApi) => {
    CodePush.checkForUpdate()
      .then((update) => {
        if (update) {
          listenerApi.dispatch(appActions.setCodePushVersion(update));
          listenerApi.dispatch(
            OthersActions.setSttForceUpdateApp(
              update.isMandatory ? SttForcecUpdateApp.REQUIRED : SttForcecUpdateApp.NO_REQUIRED
            )
          );
        } else {
          _action?.payload?.onNoUpdate?.();
          listenerApi.dispatch(OthersActions.setSttForceUpdateApp(SttForcecUpdateApp.NO_UPDATE));
        }
      })
      .catch((err) => {
        _action?.payload?.onNoUpdate?.();
        listenerApi.dispatch(OthersActions.setSttForceUpdateApp(SttForcecUpdateApp.NO_UPDATE));
      });
  },
});
