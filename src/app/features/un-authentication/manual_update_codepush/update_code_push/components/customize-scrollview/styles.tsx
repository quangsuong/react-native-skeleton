import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
const useStyleCustomScrollView = () => {
  return useMemo(() => {
    const { colors } = useTheme();
    return StyleSheet.create({
      gradientBottom: {
        width: '100%',
        height: 45,
        position: 'absolute',
        zIndex: 9999,
        bottom: 0,
      },
      gradientTop: {
        width: '100%',
        height: 45,
        position: 'absolute',
        zIndex: 9999,
        top: 0,
      },
    });
  }, []);
};
export default useStyleCustomScrollView;
