import { navigationRef, popToScreen, popToTop } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useCallback } from 'react';

interface Props {}

const useAcknowledgementApproveHook = (props: Props) => {
  const onGetAnotherSmartOtp = useCallback(() => {
    const routes = navigationRef.getState().routes;
    const previousScreen = routes.find(
      (route) => route.name === APP_SCREEN.GENERATED_SOTP_TRANSACTION
    );
    popToScreen(previousScreen?.key || APP_SCREEN.GENERATED_SOTP_TRANSACTION);
  }, []);

  const goBackSmartOtp = useCallback(() => {
    popToTop();
  }, []);

  return {
    onGetAnotherSmartOtp,
    goBackSmartOtp,
  };
};

export default useAcknowledgementApproveHook;
