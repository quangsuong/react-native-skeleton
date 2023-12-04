import { StyleSheet } from 'react-native';

import { K_BORDER_RADIUS_16, K_FONT_SIZE_15, K_PADDING_16, K_SIZE_12, K_SIZE_36 } from '@common';

export const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor:Colors.K_BG_COLOR_TRANSPARENT,
    margin: 0,
    justifyContent: 'flex-end',
  },
  wrap: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 20,
    alignItems: 'center',
    borderTopLeftRadius: K_BORDER_RADIUS_16,
    borderTopRightRadius: K_BORDER_RADIUS_16,
  },
  backDrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 998,
  },
  wrapOption: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  wrapCancel: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  textCancel: {
    color: 'rgba(255,0,0,0.8)',
  },
  wrapTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: K_PADDING_16,
    width: '100%',
  },
  title: {
    fontSize: K_FONT_SIZE_15,
    alignSelf: 'center',
  },
  wrapTextCancel: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  wrapTextOption: {
    paddingVertical: 10,
  },
  close_wrap: {
    position: 'absolute',
    left: K_SIZE_12,
    width: K_SIZE_36,
    top: 0,
    bottom: 0,
    zIndex: 99,
    justifyContent: 'center',
  },
  close: {
    width: K_SIZE_36,
    height: K_SIZE_36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
