import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { DirectType, LinearProps } from './type';

export const LinearGradientView = (props: LinearProps) => {
  const direct = useMemo(() => {
    switch (props.direct) {
      case DirectType.vertical:
        return { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } };
      case DirectType.horizontal:
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } };
      case DirectType.topLeftToRight:
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
      case DirectType.bottomLeftToRight:
        return { start: { x: 1, y: 1 }, end: { x: 1, y: 1 } };
      default:
        return { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } };
    }
  }, [props.direct]);
  // render
  return <LinearGradient {...props} {...direct} />;
};
