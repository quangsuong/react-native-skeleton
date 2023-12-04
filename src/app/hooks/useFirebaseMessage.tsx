import { dispatch } from '@common';
import { appFirebase } from '@firebase';
import notifee, { Event } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { appActions } from '@redux-slice';
import NotificationHelper from '@utils/notification-helper';
import { useEffect } from 'react';
import {
  useBackgroundOpenedNotification,
  useInAppNotification,
  useKilledOpenedNotification,
} from '../common/firebase/notification';

export const useForegroundMessage = () => {
  useInAppNotification(async (message) => {
    await NotificationHelper.onDisplayNotification(message);
  });
  useEffect(() => {
    NotificationHelper.createChanelFull();
  }, []);
};

export const useForegroundEvent = () => {
  useEffect(() => {
    const sub = notifee.onForegroundEvent((evt: Event) => {
      NotificationHelper.handleOpenNotificationViaNotifee(evt, false);
    });
    return () => {
      sub();
    };
  }, []);
};

export const useOpenNotificationBackground = () => {
  useBackgroundOpenedNotification((evt) => {
    NotificationHelper.handleOpenNotificationViaNotifee(evt, true);
  });
};

export const useOpenNotificationKilledApp = () => {
  useKilledOpenedNotification((message) => {
    NotificationHelper.handleOpenNotificationViaNotifee(message, false);
  });
};
export const useOnRefreshTokenFCM = () => {
  useEffect(() => {
    const subscribe = messaging().onTokenRefresh(async (token?: string) => {
      if (token) {
        dispatch(appActions.setNotificationToken(token));
      } else {
        const tokenRefresh = await appFirebase.notification.getDeviceToken();
        console.log(
          '🚀 ~ file: useFirebaseMessage.tsx:55 ~ subscribe ~ tokenRefresh:',
          tokenRefresh
        );
        if (tokenRefresh) {
          dispatch(appActions.setNotificationToken(tokenRefresh));
        }
      }
    });
    return () => {
      subscribe;
    };
  }, []);
};
