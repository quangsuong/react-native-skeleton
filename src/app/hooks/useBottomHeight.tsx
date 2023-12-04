import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useContext, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { K_SIZE_36, K_SIZE_37, K_SIZE_94 } from '../common/constant';
import { isIos } from '../common/method';

export const useBottomHeight = () => {
  const insets = useSafeAreaInsets();
  const height = useContext(BottomTabBarHeightContext);
  const HEIGHT_BAR = 68;
  const iconQRHeight = K_SIZE_94;
  const paddingBottomIcon = (isIos ? K_SIZE_36 : K_SIZE_37) + insets.bottom;
  const totalHeightIcon = (iconQRHeight + paddingBottomIcon - 7) / 4;
  const nonHeightTabbar = useMemo(() => {
    return totalHeightIcon - (height ? height - HEIGHT_BAR : 0);
  }, [height, totalHeightIcon]);
  const includeHeightTabbar = useMemo(() => {
    if (height) {
      return height + totalHeightIcon + (insets?.bottom == 0 ? 34 : 0);
    }
    return HEIGHT_BAR + totalHeightIcon + (insets?.bottom == 0 ? 34 : 0);
  }, [height, insets?.bottom, totalHeightIcon]);
  return { includeHeightTabbar, nonHeightTabbar };
};
