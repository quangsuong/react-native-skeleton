import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { ActionContext } from '../../../hooks/trackContext';
import { ACTION_TYPE } from './types';

type Props = {
  name: keyof typeof ACTION_TYPE;
  children: React.ReactNode;
  params?: object;
};

const ActionComponent = ({ name, children, params }: Props) => {
  const content = React.useMemo(() => children, [children]);
  // render
  return <ActionContext.Provider value={{ name, params }}>{content}</ActionContext.Provider>;
};

export const ActionTrack = memo(ActionComponent, isEqual);
