import { CustomTabbar } from '@components/custom-tabbar';
import { Home } from '@features/authentication';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';

// const wrapInSharedElementStack = (
//   Screen: SharedElementSceneComponent<any>,
//   name: string,
// ): ComponentType<any> => {
//   const SharedStack = createSharedElementStackNavigator();
//   return () => (
//     <SharedStack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName={name}>
//       <SharedStack.Screen name={name} component={Screen} />
//     </SharedStack.Navigator>
//   );
// };

const BottomBar = createBottomTabNavigator();
type Props = {};

const TabBarComponent = (props: Props) => {
  const { colors } = useTheme();
  return (
    <BottomBar.Navigator
      tabBar={(props) => <CustomTabbar {...props} />}
      screenOptions={{
        ...screenOptions,
        tabBarInactiveTintColor: colors.color_50,
        tabBarActiveTintColor: colors.color_primary_500,
        tabBarItemStyle: {
          backgroundColor: colors.transparent,
        },
        tabBarBackground: () => {
          return null;
        },
      }}
    >
      <BottomBar.Screen
        name={'home'}
        // component={wrapInSharedElementStack(Home, APP_SCREEN.HOME)}
        component={Home}
      />
      {/* <BottomBar.Screen
        name={'service'}
        component={ServiceScreen}
      // component={wrapInSharedElementStack(ServiceScreen, APP_SCREEN.SERVICE_SCREEN)}
      />
      <BottomBar.Screen name={'scan'} component={View} />
      <BottomBar.Screen
        name={'gift'}
        component={Gift}
      // component={wrapInSharedElementStack(Gift, APP_SCREEN.GIFT)}
      />
      <BottomBar.Screen
        name={'setting'}
        component={SettingScreen}
      // component={wrapInSharedElementStack(SettingScreen, APP_SCREEN.SETTING)}
      /> */}
    </BottomBar.Navigator>
  );
};

export const TabBar = memo(TabBarComponent, isEqual);

const screenOptions: BottomTabNavigationOptions = {
  tabBarInactiveTintColor: '#fff',
  tabBarActiveTintColor: '#292663',
  tabBarItemStyle: {
    backgroundColor: 'white',
  },
  tabBarLabelStyle: {
    top: -6,
  },
  tabBarShowLabel: true,
  headerShown: false,
};
