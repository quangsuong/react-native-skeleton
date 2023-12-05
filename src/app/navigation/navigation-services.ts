import { RootStackParamList } from '@navigation/screen-types';
import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { findIndex } from 'lodash';

export const navigationRef =
  createNavigationContainerRef<NavigationContainerRef<RootStackParamList>>();

export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName] | object
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name as string, params));
  }
}

export function push<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName] | object
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name as string, params));
  }
}

export function replace<RouteName extends keyof RootStackParamList>(
  screen: RouteName,
  params?: RootStackParamList[RouteName] | object
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(screen as string, params));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack);
  }
}

export function setParams(params: any) {
  if (navigationRef.isReady()) {
    navigationRef.setParams(params);
  }
}

export function popToScreen(keyScreen: string) {
  const route = navigationRef.getState().routes;
  const index = findIndex(
    route,
    (e) => {
      return e.key === keyScreen;
    },
    0
  );
  pop(route.length - index - 1);
}

export function pop(count?: number) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count || 0));
  }
}

export function popToTop() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

export function reset<RouteName extends keyof RootStackParamList>(
  screen: RouteName,
  params?: RootStackParamList[RouteName] | object,
  routes?: any[]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: routes ?? [
          {
            name: screen,
            params,
          },
        ],
      })
    );
  }
}
