import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { ControlContext } from '../../../hooks/trackContext';
import { CONTROL_TYPE } from './types';

type Props = {
  name: keyof typeof CONTROL_TYPE;
  children: React.ReactNode;
  params?: object;
};

const ControlComponent = ({ name, children, params }: Props) => {
  const content = React.useMemo(() => children, [children]);
  // render
  return <ControlContext.Provider value={{ name, params }}>{content}</ControlContext.Provider>;
};

export const ControlTrack = memo(ControlComponent, isEqual);
