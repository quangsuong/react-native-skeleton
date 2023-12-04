import { Block } from '@components/block';
import { Text } from '@components/text';
import { useTheme } from '@theme';
import React, { memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
interface Props {
  step: number;
  size: number;
  max?: number;
}

const Component = (props: Props) => {
  const { size, step, max } = props;
  const { colors } = useTheme();
  const _getMax = useMemo(() => {
    return max || 5;
  }, [max]);
  const getData = useMemo(() => {
    switch (step) {
      case 1:
        return [0, 1, _getMax - 1];
      default:
        return [step - 1, 1, _getMax - step];
    }
  }, [step, max]);

  const getColor = useCallback((index: number) => {
    switch (index) {
      case 0:
        return colors.color_primary_500;
      case 1:
        return colors.color_primary_100;
      case 2:
        return colors.color_300;
    }
  }, []);

  const pieData = getData.map((value, index) => ({
    value,
    svg: {
      fill: getColor(index),
    },
    key: `pie-${index}`,
  }));

  return (
    <Block width={size} height={size} justifyContent={'center'} alignItems={'center'}>
      <PieChart
        innerRadius={'75%'}
        padAngle={0}
        style={{ height: size, width: size }}
        data={pieData}
        sort={() => true}
      />
      <Block style={StyleSheet.absoluteFill} justifyContent="center" alignItems="center">
        <Text text={`${step}/${_getMax}`} preset={'subtitle1'} color={colors.color_800} />
      </Block>
    </Block>
  );
};

export const StepOnboarding = memo(Component, isEqual);
