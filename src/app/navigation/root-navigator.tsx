
import React, { useEffect, useMemo } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

import { useAppSelector } from '@redux/store';
import { selectAuth } from '@redux/slices';
import { APP_SCREEN, RootStackParamList } from './screen-types';
import { reset } from './navigation-services';

const Homepage = React.lazy(() => import('@features/authentication/home'));

const Login = React.lazy(() => import('@features/un-authentication/login'));

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // state
  const {auth} = useAppSelector(selectAuth)

  // effect
  useEffect(() => {
    setTimeout(() => {
      LottieSplashScreen.hide();
    }, 500);
  }, []);

  const isLoggedIn = useMemo(() => {
    return auth?.access_token;
  }, [auth]);

  useEffect(() => {
    reset(isLoggedIn ? APP_SCREEN.HOMEPAGE : APP_SCREEN.LOGIN);
  }, [isLoggedIn]);

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
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
