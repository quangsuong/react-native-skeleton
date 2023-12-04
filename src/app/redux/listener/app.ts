import { takeLatestListeners } from '@listener';
import { appActions } from '../action-slice/app';

takeLatestListeners()({
  actionCreator: appActions.startLoadApp,
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(appActions.endLoadApp());
  },
});
