import { BASE_THEME } from '@common';
import { Block } from '@components/block';
import { rxLightStatusBar } from '@config/regex';
import { Shadows, ShadowTypes } from '@foundation/shadow-foundation';
import { selectAppConfig } from '@redux-selector/app';
import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

interface Props {
  children: React.ReactNode;
  type?: keyof ShadowTypes; //default down-m
  style?: ViewStyle;
}
export const Shadow = (props: Props) => {
  // state
  const { children, type, style } = props;
  const { theme } = useSelector(selectAppConfig);

  const _stylesShadow = useMemo(() => {
    const { height, shadowRadius } = Shadows[type || 'down-m'];
    return {
      shadowOffset: { width: 0, height },
      shadowRadius,
      backgroundColor: rxLightStatusBar.test(theme) ? 'transparent' : 'white',
    };
  }, [theme]);

  // render
  return (
    <Block
      style={{
        ...BASE_THEME.boxShadown,
        ..._stylesShadow,
        borderRadius: BASE_THEME.borderRadiusBox,
        ...style,
      }}
    >
      {children}
    </Block>
  );
};
