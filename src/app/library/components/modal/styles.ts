import { K_SCREEN_WIDTH, sizeScale } from '@common';
import { Colors } from '@foundation';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapGesture: {
    width: K_SCREEN_WIDTH,
    position: 'absolute',
    top: 8,
    left: (K_SCREEN_WIDTH - 48) / 2,
  },
  anchor: {
    height: sizeScale(4),
    width: 48,
    borderRadius: sizeScale(24),
    backgroundColor: Colors.color_300,
  },
});
