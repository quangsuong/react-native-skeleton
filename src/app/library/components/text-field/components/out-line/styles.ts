import { K_BUTTON_HEIGHT, sizeScale } from '@common';
import { BorderRadius } from '@foundation';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: BorderRadius.border_radius_m,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  input: {
    color: '#000',
    borderBottomColor: 'transparent',
    paddingHorizontal: sizeScale(12),
    height: K_BUTTON_HEIGHT,
  },
  text: {
    alignSelf: 'flex-start',
    zIndex: 4,
    left: 5,
  },
  wrapLabel: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  wrapPlaceHolder: {
    position: 'absolute',
    alignSelf: 'flex-end',
    // paddingLeft: 5,
  },
  flex: {
    flex: 1,
    paddingHorizontal: 5,
  },
  overlay_right: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 99,
  },
  overlay_left: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 99,
  },
});
