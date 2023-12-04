import { K_SIZE_30, K_TOAST_DURATION, RXStore } from '@common';
import { ProgressDialog, SnackBar } from '@components';
import { AlertView } from '@components/alert';
import { ToastView } from '@components/toast';
import useAppContainer from '@customHooks/useAppContainer';
import useLanguage from '@customHooks/useLanguage';
import { ManualUpdateCodePush } from '@features/un-authentication/manual_update_codepush';
import { navigationRef } from '@navigation/navigation-service';
import { RootNavigation } from '@navigation/root-navigator';
import { NavigationContainer } from '@react-navigation/native';
import { selectAppConfig } from '@redux-selector/app';
import { MyAppTheme } from '@theme';
import React, { useEffect } from 'react';
import codePush from 'react-native-code-push';
import { Host } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { logScreenView } from '../common/firebase/analytics';

import { useForegroundEvent } from '@customHooks/useFirebaseMessage';
import { CodePushPopup } from '@features/un-authentication/manual_update_codepush/updatePopup';
import NetworkLoggerComponent from '@components/network-logger';
import { View } from "react-native";
import { BiometricsProvider } from "@customHooks/biometricsContext";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
};

const AppContainer = () => {
  // state
  const { loadingApp, theme } = useSelector(selectAppConfig);
  const { loadLanguage } = useLanguage();
  const insets = useSafeAreaInsets();
  useAppContainer();

  const routeNameRef = React.useRef<string | undefined>('');

  useEffect(() => {
    //load language from cache
    loadLanguage();
  }, []);

  useForegroundEvent();
  // render
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={MyAppTheme[theme]}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <ToastProvider
        duration={K_TOAST_DURATION}
        swipeEnabled={false}
        offsetBottom={insets.bottom + K_SIZE_30}
        renderToast={(props) => <ToastView {...props} />}
      >
        {!loadingApp && (
          <BiometricsProvider>
            <Host>
              <RootNavigation />
            </Host>
            <SnackBar />
            <AlertView />
            <ManualUpdateCodePush />
            <ProgressDialog />
            <CodePushPopup />
            <NetworkLoggerComponent />
          </BiometricsProvider>
        )}
        <RXStore />
      </ToastProvider>
    </NavigationContainer>
  );
};

export default codePush(codePushOptions)(AppContainer);
