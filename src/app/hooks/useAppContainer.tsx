import { dispatch } from '@common';
import { AppModule } from '@native-module';
import { selectAppConfig, selectShowIntro } from '@redux-selector/app';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appActions } from '../redux/action-slice/app';
import { OthersActions } from '../redux/action-slice/others';

const useAppContainer = () => {
  const { theme } = useSelector(selectAppConfig);
  const enableShowIntro = useSelector(selectShowIntro);
  const _checkUpdateCodePush = useCallback(() => {
    dispatch(OthersActions.checkUpdateCodePush());
  }, []);

  useEffect(() => {
    if (!__DEV__ && !enableShowIntro) {
      _checkUpdateCodePush();
    }
  }, [enableShowIntro]);

  // effect
  useEffect(() => {
    dispatch(appActions.startLoadApp());
  }, []);

  useEffect(() => {
    if (theme !== 'default') {
      AppModule.setIQKeyboardOption({
        keyboardAppearance: 'dark',
      });
    } else {
      AppModule.setIQKeyboardOption({
        keyboardAppearance: 'light',
      });
    }
  }, [theme]);
  return {};
};
export default useAppContainer;
