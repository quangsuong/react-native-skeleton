import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import useLanguage from '@customHooks/useLanguage';
import { navigationRef } from '@navigation/navigation-services';
import { RootNavigation } from '@navigation/root-navigator';
import { MyAppTheme } from '@theme';
import { useAppSelector } from '@redux/store';
import { selectApp } from '@redux/slices';

export default function AppContainer() {
  // state
  const { loadingApp, theme } = useAppSelector(selectApp);
  const { loadLanguage } = useLanguage();

  const routeNameRef = React.useRef<string | undefined>('');

  useEffect(() => {
    //load language from cache
    loadLanguage();
  }, []);

  // render
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={MyAppTheme[theme]}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;

        routeNameRef.current = currentRouteName;
      }}
    >
        {!loadingApp && (
            <RootNavigation />
        )}
    </NavigationContainer>
  );
};

