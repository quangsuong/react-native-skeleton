import analytics from '@react-native-firebase/analytics';

export const logScreenView = async ({ screen_name = '', screen_class = '' }) => {
  await analytics().logScreenView({
    screen_name,
    screen_class,
  });
};

export const logEvent = async (keyEvent: string, params?: Object) => {
  await analytics().logEvent(keyEvent, params);
};
