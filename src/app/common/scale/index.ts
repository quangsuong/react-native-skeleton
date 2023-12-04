import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

const baseScreenWith = 350;
const baseScreenHeight = 680;

export const sizeScale = (size = 11): number => {
  const scaleWidth = width / baseScreenWith;
  const scaleHeight = height / baseScreenHeight;
  const scale = Math.min(scaleWidth, scaleHeight);
  return Math.ceil(
    scale *
      (size +
        Platform.select({
          ios: 0,
          android: 0.5,
          default: 0,
        }))
  );
};

export const fontScale = (size: number) => {
  return getScaleDimension(size, 'font');
};

export const getScaleDimension = (dimension: number, type: 'height' | 'width' | 'font') => {
  let ratio = 1;
  switch (type) {
    case 'height':
      ratio = height / baseScreenHeight;
      break;
    case 'width':
      ratio = width / baseScreenWith;
      break;
    case 'font':
      ratio = width / baseScreenWith > 1.23 ? 1.23 : width / baseScreenWith;
      break;
  }
  return ratio * dimension;
};
