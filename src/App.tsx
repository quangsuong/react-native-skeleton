import React, {useEffect} from 'react';
import { I18nextProvider, useTranslation } from "react-i18next";
import {
  ScrollView,
  StatusBar, Text,
  useColorScheme,
  View,
  StyleSheet
} from "react-native";

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-lottie-splash-screen';
import i18n from '@utils/i18n/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppContainer from '@navigation/app-navigation';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
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
      <SafeAreaProvider style={backgroundStyle}>
        <I18nextProvider i18n={i18n}>
          <GestureHandlerRootView style={styles.root}>
            <AppContainer />
          </GestureHandlerRootView>
        </I18nextProvider>
      </SafeAreaProvider>
  );
};

export default App;
