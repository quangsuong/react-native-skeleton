import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { SectionContext } from '../../../hooks/trackContext';
import { SECTION_TYPE } from './types';

type Props = {
  name: keyof typeof SECTION_TYPE;
  children: React.ReactNode;
  params?: object;
};

const SectionComponent = ({ name, children, params }: Props) => {
  const content = React.useMemo(() => children, [children]);
  // render
  return <SectionContext.Provider value={{ name, params }}>{content}</SectionContext.Provider>;
};

export const SectionTrack = memo(SectionComponent, isEqual);
