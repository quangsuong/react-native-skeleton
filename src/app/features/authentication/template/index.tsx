import { Header, Screen, SectionTrack } from '@components';
import { BackgroundApp } from '@components/background-app';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';

const Component = () => {
  const { colors } = useTheme();
  // render
  return (
    <Screen name={'TEMPLATE'} backgroundColor={colors.color_200}>
      <BackgroundApp turnOnSafe noTouch>
        <Header />
        <SectionTrack name="BODY">
          <></>
        </SectionTrack>
      </BackgroundApp>
    </Screen>
  );
};

const Template = memo(Component, isEqual);
export default Template;
