import { K_PADDING_HORIZONTAL_8, K_SIZE_40 } from '@common';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: K_SIZE_40,
    borderRadius: K_SIZE_40 / 2,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: K_PADDING_HORIZONTAL_8,
  },
});
