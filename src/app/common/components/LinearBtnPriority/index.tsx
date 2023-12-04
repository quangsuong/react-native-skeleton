import { LinearGradientView } from '@components/linear-view';
import { ColorsPriority } from '@foundation';
import { useTheme } from '@theme';
import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { useStyle } from './styles';

interface LinearBtnPriorityProps {
  type?: 'primary';
  initColors?: typeof ColorsPriority;
}

const Component = (props: LinearBtnPriorityProps) => {
  const [t] = useTranslation();
  const styles = useStyle();
  const { colors: _colors } = useTheme();
  const { initColors } = props;

  const colors = useMemo(() => initColors ?? _colors, [_colors, initColors]);

  if (props.type !== 'primary') {
    return <></>;
  }

  return (
    <LinearGradientView
      colors={[colors.gradient_priority_start, colors.gradient_priority_end]}
      direct="horizontal"
      style={styles.btnGradient}
    />
  );
};

export const LinearBtnPriority = memo(Component, isEqual);
