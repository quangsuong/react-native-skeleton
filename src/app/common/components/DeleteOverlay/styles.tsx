import { useTheme } from '@theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

function useStyle() {
  const { colors } = useTheme();

  return useMemo(() => {
    return StyleSheet.create({
      delBtn: {
        // position: 'absolute',
        // right: 20,
        // top: 10,
        // padding: 3,
        // justifyContent: 'center',
        // alignItems: 'center'
      },
      text: {
        fontSize: 14,
        fontWeight: '900',
        color: 'white',
      },
    });
  }, [colors]);
}

export default useStyle;
