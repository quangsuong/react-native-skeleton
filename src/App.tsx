import React, {useEffect} from 'react';
import { I18nextProvider, useTranslation } from "react-i18next";
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar, Text,
  useColorScheme,
} from "react-native";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-lottie-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import i18n from '@utils/i18n/i18n';
import store, { persistor } from '@redux/store';
import Login from '@features/un-authentication/login';

const App = () => {
  const [t] = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <SafeAreaView style={backgroundStyle}>
        <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Text>{t('alert:login_another')}</Text>
            <Login/>
          </View>
        </ScrollView>
        </I18nextProvider>
        </PersistGate>
        </Provider>
      </SafeAreaView>
  );
};

export default App;
