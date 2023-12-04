import ReactNativeHapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback';

/**
 * @static
 * @method Generate
 * @description Triggers haptic feedback of type :type
 * @param type Type of haptic feedback
 */

export const hapticFire = (type: keyof typeof HapticFeedbackTypes) => {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: true,
  };
  ReactNativeHapticFeedback.trigger(type, options);
};
