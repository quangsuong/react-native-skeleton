import Bugsnag, { NotifiableError, OnErrorCallback } from '@bugsnag/react-native';
import { ENVConfig } from '@config/env';
import {
  getDeviceNameSync,
  getSystemName,
  getSystemVersion,
  getUniqueIdSync,
} from 'react-native-device-info';
export interface UserBugSnag {
  id?: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
}

const BugsnagUtil = {
  start: () => {
    Bugsnag.start({
      onError: function (event) {
        event.addMetadata('Metadata', {
          deviceId: getUniqueIdSync(),
          deviceName: getDeviceNameSync(),
          deviceVersion: getSystemVersion(),
          os: getSystemName(),
        });
      },
    });
  },

  setUser: ({ id, email, name, phoneNumber }: UserBugSnag) => {
    if (ENVConfig.APP_ENV === 'Prod') {
      Bugsnag.setUser(id, email || phoneNumber, name);
    }
  },
  notify: (error: NotifiableError, onError?: OnErrorCallback) => {
    if (ENVConfig.APP_ENV === 'Prod') {
      Bugsnag.notify(error, onError);
    }
  },
  reset: () => {
    Bugsnag.setUser();
  },
};

export { BugsnagUtil };
