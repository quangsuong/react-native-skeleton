import { NetworkLoggerScreen } from '@components/network-logger/screen';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { selectSessionId } from '@redux-selector/app';
import { useTheme } from '@theme';
import React, { useCallback, useEffect, useMemo } from 'react';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import { useSelector } from 'react-redux';
import { reset } from './navigation-service';
import { APP_SCREEN, RootStackParamList } from './screen-types';

const Template = React.lazy(() => import('@features/authentication/template'));
const Homepage = React.lazy(() => import('@features/authentication/home'));
const Login = React.lazy(() => import('@features/un-authentication/login'));
const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // state
  const sessionId = useSelector(selectSessionId);
  const { colors } = useTheme();

  // effect
  useEffect(() => {
    setTimeout(() => {
      LottieSplashScreen.hide();
    }, 500);
  }, []);

  const isChangeSessionId = useMemo(() => {
    return sessionId ? true : false;
  }, [sessionId]);

  useEffect(() => {
    reset(sessionId ? APP_SCREEN.AUTHORIZE : APP_SCREEN.LOGIN);
  }, [isChangeSessionId]);


  // render
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <RootStack.Group>
        <RootStack.Screen
          options={{
            gestureEnabled: false,
          }}
          name={APP_SCREEN.LOGIN}
          component={Login}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen name={APP_SCREEN.HOMEPAGE} component={Homepage} />
        <RootStack.Screen name={APP_SCREEN.AUTHORIZE} component={Template} />
        <RootStack.Screen name={APP_SCREEN.NETWORK_LOGGER} component={NetworkLoggerScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
