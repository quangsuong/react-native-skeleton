import { BugsnagUtil, CustomOmit, isIos, requestPermission } from '@common';
import messaging, { firebase, FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { PERMISSIONS_RESULT } from '@utils/photo-utils';
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { requestNotifications } from 'react-native-permissions';
export interface RemoteNotification<T>
  extends CustomOmit<FirebaseMessagingTypes.RemoteMessage, 'data'> {
  // Nested data from fcm is string. carefully when use
  data?: T;
}

export const requestNotificationPermission = async () => {
  let enabled = false;
  try {
    if (isIos) {
      const authStatus = await messaging().requestPermission();
      enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } else {
      enabled =
        (await requestNotifications(['alert', 'badge', 'sound'])).status ===
        PERMISSIONS_RESULT.GRANTED;
      requestPermission(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
        onGranted: () => {},
        onBlocked: () => {
          enabled = false;
        },
        onDenied: () => {
          enabled = false;
        },
      });
    }
  } catch (error) {
    // @ts-ignore
    BugsnagUtil.notify(error);
  }
  return enabled;
};

export const getDeviceToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const enabled = await messaging().hasPermission();
  if (enabled) {
    return messaging().getToken();
  }
  return Promise.resolve('');
};

/**
 * Notification coming when app in foreground
 */
export const useInAppNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any
) => {
  // effect
  useEffect(() => {
    const sub = messaging().onMessage(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any
    );

    return () => {
      sub();
    };
  }, []);
};

/**
 * Notification coming when app in background or quit state
 */
export const useBackgroundNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any
) => {
  useEffect(() => {
    messaging().setBackgroundMessageHandler(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any
    );
  }, []);
};

/**
 * User click notification when app in background
 */
export const useBackgroundOpenedNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any
) => {
  // effect
  useEffect(() => {
    const sub = firebase
      .messaging()
      .onNotificationOpenedApp(callback as (message: FirebaseMessagingTypes.RemoteMessage) => any);
    return () => {
      sub();
    };
  }, []);
};

/**
 * User click notification when app in killed or quit state
 */
export const useKilledOpenedNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T> | null) => any
) => {
  // effect
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(callback as (message: FirebaseMessagingTypes.RemoteMessage | null) => any);
  }, []);
};
