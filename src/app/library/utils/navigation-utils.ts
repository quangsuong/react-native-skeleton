import { navigationRef } from '@navigation/navigation-service';

function checkRoute(routes: string[]): boolean {
  const regex = new RegExp(routes.join('|'));
  return regex.test(navigationRef.getCurrentRoute()?.name);
}

export const navigationUtils = {
  checkRoute,
};
