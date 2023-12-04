import { APP_SCREEN } from '@navigation/screen-types';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { ScreenContext } from '../../../hooks/trackContext';

type Props = {
  name: keyof typeof APP_SCREEN | '';
  children: React.ReactNode;
  params?: object;
};

const ScreenComponent = ({ name, children, params }: Props) => {
  const content = React.useMemo(() => children, [children]);
  // render
  return <ScreenContext.Provider value={{ name, params }}>{content}</ScreenContext.Provider>;
};

export const ScreenTrack = memo(ScreenComponent, isEqual);
