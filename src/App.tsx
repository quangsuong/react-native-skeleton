import React, {useEffect} from 'react';
import { I18nextProvider, useTranslation } from "react-i18next";
import {
  SafeAreaView,
  ScrollView,
  StatusBar, Text,
  useColorScheme,
  View
} from "react-native";

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-lottie-splash-screen';
import i18n from '@utils/i18n/i18n';
const App = () => {
  const [t] = useTranslation()
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
            <Text>{t('alert:login_another')}</Text>
          </View>
        </ScrollView>
        </I18nextProvider>
      </SafeAreaView>
  );
};

export default App;
