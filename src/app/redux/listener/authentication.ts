import { BugsnagUtil, dispatch } from '@common';
import { hideLoading, showLoading } from '@components';
import { takeLatestListeners } from '@listener';
import { push, reset } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import LoginService from '@service/login-service';
import { StorageSecure } from '@utils/storage-secure';
import { authenticationActions } from '../action-slice/authentication';
import { accountAction } from '../action-slice/account';
import { CustomerAccount } from '@model/account';

takeLatestListeners(true)({
  actionCreator: authenticationActions.login,
  effect: async (action, listenerApi) => {
    const { body, from } = action.payload as any;

    showLoading();
    const response = await LoginService(body);
    hideLoading();
    // @ts-ignore
    const { result } = response;
    const data = response.data as any;
    if (result == undefined) {
      return;
    }

    if (result?.responseCode !== '00') {
      action.payload.onFailure({ ...result, ...body });
      return;
    }

    action.payload.onSucceeded(data);
    const customer = data.customer as CustomerAccount;
    dispatch(accountAction.setCustomer(customer));

    push(APP_SCREEN.DASHBOARD);
    //save to keychain

    setTimeout(() => {
      StorageSecure.saveItem('K_PASS_WORD', body?.password || '');
      StorageSecure.saveItem('K_USER_NAME', body?.userId || '');
    }, 1500);
  },
});

takeLatestListeners(true)({
  actionCreator: authenticationActions.logout,
  effect: async (action, listenerApi) => {
    try {
      showLoading();
      await listenerApi.delay(500);
    } catch (error) {
      //@ts-ignore
      BugsnagUtil.notify(error);
    } finally {
      hideLoading();
    }
    reset(APP_SCREEN.LOGIN);
    listenerApi.dispatch(authenticationActions.setSessionId(''));
  },
});

takeLatestListeners(true)({
  actionCreator: authenticationActions.clearSession,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(authenticationActions.setSessionId(''));
  },
});
