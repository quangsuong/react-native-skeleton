import { IconSvgLocal } from '@components/icon-vec-local';
import { selectAppConfig } from '@redux-selector/app';
import { useTheme } from '@theme';
import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { K_SCREEN_WIDTH } from '../../constant';
import { useStyle } from './styles';

const Component = () => {
  const { theme } = useSelector(selectAppConfig);

  const isDark = useMemo(() => theme === 'dark', [theme]);
  const linearColor = useMemo(
    () =>
      isDark
        ? ['#161E37', '#192F52', '#111032', '#0D0D1F', '#0B0B1B']
        : ['#fff', '#FFEEC1', '#FFF3D6', '#FFF8E5'],
    [isDark]
  );

  const locations = useMemo(
    () => (isDark ? [0, 0.4688, 0.7604, 1] : [0, 0.2478, 0.6406, 0.875, 1]),
    [isDark]
  );

  const { colors } = useTheme();
  const styles = useStyle({ colors });
  const colorWave = useMemo(() => (isDark ? '#0072BC' : '#FFC709'), [isDark]);

  // render
  return (
    <LinearGradient
      locations={locations}
      colors={linearColor}
      style={[StyleSheet.absoluteFill, styles.linear]}
    >
      <IconSvgLocal
        name="WAVE"
        width={K_SCREEN_WIDTH * 1.2}
        style={styles.wave}
        color={colorWave}
      />
    </LinearGradient>
  );
};

export const QrBackground = memo(Component, isEqual);
