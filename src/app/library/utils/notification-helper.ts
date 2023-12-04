import { dispatch, K_IS_IOS } from '@common';
import { navigate, navigationRef } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import notifee, {
  AndroidBadgeIconType,
  AndroidColor,
  AndroidImportance,
  Event,
  EventType,
} from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { OthersActions } from '@redux-slice';
import { store } from '@store/store';
import { DeviceEventEmitter } from 'react-native';
import eventConstant from '../../common/constant/eventConstant';
import { requestNotificationPermission } from '../../common/firebase/notification';

enum TYPE_NOTIFICATION {
  BALANCE_ALERT = 'BALANCE_ALERT',
}

// for android
export let channelId = null;
const createChanelFull = async () => {
  // @ts-ignore
  channelId = await notifee.createChannel({
    id: 'pvcombank',
    name: 'PVCOMBANK',
    badge: true,
    vibration: true,
    vibrationPattern: [300, 500],
    lights: true,
    lightColor: AndroidColor.RED,
    importance: AndroidImportance.HIGH,
  });
};
const setBadgeCount = async (num: number) => {
  try {
    await notifee.setBadgeCount(num);
  } catch (e) {
    console.log(
      `-------\n library/utils/notifee-helper\nSET BADGET COUNT FAILED - ${e}\n----------`
    );
  }
};
const incrementBadgeCount = async (num?: number) => {
  try {
    await notifee.incrementBadgeCount(num ?? 1);
  } catch (e) {
    console.log(
      `-------\n library/utils/notifee-helper\nINCREMENTING COUNT FAILED - ${e}\n----------`
    );
  }
};
const decrementBadgeCount = async (num?: number) => {
  try {
    await notifee.decrementBadgeCount(num ?? 1);
  } catch (e) {
    console.log(
      `-------\n library/utils/notifee-helper\nDECREMENT COUNT FAILED - ${e}\n----------`
    );
  }
};
const cancelNotification = async (notificationId: string) => {
  try {
    await notifee.cancelNotification(notificationId);
  } catch (e) {
    console.log(
      `-------\n library/utils/notifee-helper\n CANCEL NOTIFICATION FAILED - ${e}\n----------`
    );
  }
};
const getDataDisplayForIOS = (message: FirebaseMessagingTypes.RemoteMessage) => {
  try {
    const { messageId, from, sentTime, mutableContent } = message;
    // let attachmentsIOS = [];
    // if(image){
    //   attachmentsIOS.push({url: image})
    // }
    const iosData = message?.notification?.ios || {};
    return {
      ...iosData,
      sound: 'default',
      critical: false,
      provisional: false,
      // attachments: attachmentsIOS
    };
  } catch (e) {
    console.log('GET DATA DISPLAY FOR IOS FAILED', e);
  }
};
const getDataDisplayForAndroid = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  try {
    const dataAndroid = message?.notification?.android || {};
    let result = {
      ...dataAndroid,
      badgeIconType: AndroidBadgeIconType.LARGE,
      importance: AndroidImportance.HIGH,
      timeStamp: new Date().getTime(),
      smallIcon: 'ic_notification',
      showTimestamp: true,
      sound: 'default',
      lights: [AndroidColor.RED, 300, 600],
      smallIconLevel: 3,
      color: '#0072BC',
      vibrationPattern: [300, 500],
      channelId: null,
      pressAction: {
        id: 'default',
        launchActivity: 'vn.com.pvcombank.MainActivity',
      },
    };
    if (!channelId) {
      await createChanelFull();
      result = {
        ...result,
        channelId: channelId,
      };
    } else {
      result = {
        ...result,
        channelId: channelId,
      };
    }
    return result;
  } catch (e) {}
};
const onDisplayNotification = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  DeviceEventEmitter.emit(eventConstant.HAVE_NEW_NOTIFICATION);
  try {
    const object = message?.notification || null;
    if (!object) {
      return;
    }
    let notification = {
      ...object,
    };
    if (K_IS_IOS) {
      const data_ios = getDataDisplayForIOS(message);
      notification = {
        ...object,
        ios: data_ios,
      };
    } else {
      const data_android = await getDataDisplayForAndroid(message);
      notification = {
        ...object,
        android: data_android,
      };
    }
    await requestNotificationPermission();
    await notifee.displayNotification(notification);
  } catch (e) {
    console.log(
      `-------\n library/utils/notifee-helper\n DISPLAY NOTIFICATION FAILED - ${e}\n----------`
    );
  }
};

const handlePressBalanceAlertNotification = (data: any, isBackground?: boolean) => {
  const sessionId = store.getState()?.authentication?.sessionId || null;
  if (isBackground) {
    if (sessionId) {
      setTimeout(() => {
        if (navigationRef?.current?.isReady && navigationRef.current.isReady()) {
          navigate(APP_SCREEN.SCREEN_NOTIFICATION, {
            isForeground: false,
            data: { ...data },
          });
        }
      }, 2000);
    } else {
      dispatch(OthersActions.setNameScreenWillShow(APP_SCREEN.SCREEN_NOTIFICATION));
    }
  } else {
    if (sessionId) {
      if (navigationRef?.current?.isReady && navigationRef.current.isReady()) {
        navigate(APP_SCREEN.SCREEN_NOTIFICATION, {
          isForeground: true,
          data: { ...data },
        });
      }
    } else {
      dispatch(OthersActions.setNameScreenWillShow(APP_SCREEN.SCREEN_NOTIFICATION));
    }
  }
};
const getBadgeCount = async () => {
  try {
    return await notifee.getBadgeCount();
  } catch (e) {
    console.log(
      `-------\n library/utils/notifee-helper\n GET BADGE COUNT FAILED - ${e}\n----------`
    );
  }
};

const handleOnPressWithTypeNotification = (message, isBackground) => {
  const type = message?.notification?.type || TYPE_NOTIFICATION.BALANCE_ALERT;
  switch (type) {
    case TYPE_NOTIFICATION.BALANCE_ALERT: {
      handlePressBalanceAlertNotification(message, isBackground);
      break;
    }
    default: {
      break;
    }
  }
};

const handleOpenNotificationViaNotifee = (event: Event, isBackground: boolean) => {
  const type = event?.type;
  // console.log('HANDLE NOTIFICATION FOREGROUND - TYPE', type ?? null);
  // console.log('HANDLE NOTIFICATION FOREGROUND - DETAIL', JSON.stringify(detail));
  const message = event?.detail || null;
  switch (type ?? EventType.UNKNOWN) {
    case EventType.PRESS: {
      handleOnPressWithTypeNotification(message, isBackground);
      break;
    }
    case EventType.ACTION_PRESS: {
      break;
    }
    case EventType.DELIVERED: {
      break;
    }
    case EventType.DISMISSED: {
      break;
    }
    case EventType.APP_BLOCKED: {
      break;
    }
    case EventType.CHANNEL_BLOCKED: {
      break;
    }
    case EventType.CHANNEL_GROUP_BLOCKED: {
      break;
    }
    default: {
      break;
    }
  }
};
export default {
  setBadgeCount,
  getBadgeCount,
  incrementBadgeCount,
  decrementBadgeCount,
  cancelNotification,
  onDisplayNotification,
  handleTouchBalanceAlertNotification: handlePressBalanceAlertNotification,
  handleOpenNotificationViaNotifee,
  createChanelFull,
};
