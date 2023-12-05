import React, {Suspense, useEffect} from 'react';
import { I18nextProvider } from "react-i18next";
import {Platform, Text, UIManager} from "react-native";
import SplashScreen from 'react-native-lottie-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import i18n from '@utils/i18n/i18n';
import store, { persistor } from '@redux/store';
import AppContainer from '@navigation/app-navigation';

if (Platform.OS !== 'ios') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            <I18nextProvider i18n={i18n}>
              <Suspense fallback={null}>
                <GestureHandlerRootView>
                  <AppContainer />
                </GestureHandlerRootView>
                <AppContainer />
              </Suspense>
            </I18nextProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
  );
};

export default App;
