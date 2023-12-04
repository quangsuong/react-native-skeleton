import { K_SCREEN_WIDTH } from '@common';
import { selectAppConfig } from '@redux-selector/app';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { ClipPath, Defs, G, LinearGradient, Path, Rect, Stop, Svg } from 'react-native-svg';
import { useSelector } from 'react-redux';

interface Props {}

const Component = (props: Props) => {
  const { colors } = useTheme();
  const { theme } = useSelector(selectAppConfig);
  return (
    <Svg width={K_SCREEN_WIDTH} height={'100%'}>
      <Defs>
        <ClipPath id="clip">
          <Rect x="0" y="0" width="100%" height="100%" />
          <G x={(K_SCREEN_WIDTH - 108) / 2} y={0}>
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d={
                'M88.6897 15.535C82.7506 28.7767 69.4524 38 54 38C38.5476 38 25.2494 28.7767 19.3103 15.535C15.694 7.47229 8.83655 0 0 0H108C99.1634 0 92.306 7.47229 88.6897 15.535Z'
              }
              fill="black"
            />
          </G>
        </ClipPath>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#040B14" stopOpacity="0" />
          <Stop offset="0.4" stopColor="#F9C461" stopOpacity="0.7" />
          <Stop offset="0.5" stopColor="#F9C461" stopOpacity="1" />
          <Stop offset="0.6" stopColor="#FAD185" stopOpacity="1" />
          <Stop offset="1" stopColor="#040B14" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={colors.color_50}
        opacity="1.0"
        clipPath="url(#clip)"
        strokeLinecap={'round'}
        rx="16"
      />
      {theme === 'priority' ? (
        <G x={(K_SCREEN_WIDTH - 108) / 2 - 1} y={-1}>
          <Path
            d="M89.6897 16.5351C83.7506 29.7768 70.4524 39.0001 55 39.0001M89.6897 16.5351C93.306 8.47243 100.163 1.00014 109 1.00014C109 1.00014 103.5 0.5 97.8263 5.36739C92.1526 10.2348 89.6897 16.5351 89.6897 16.5351ZM89.6897 16.5351C89.6897 16.5351 87 22.5 82.5 27.2252L78.3268 31L75.2826 33.1403C75.2826 33.1403 70.3229 36.1375 65.5 37.5309C60.6771 38.9243 55 39.0001 55 39.0001M55 39.0001C39.5476 39.0001 26.2494 29.7768 20.3103 16.5351M55 39.0001C55 39.0001 43.5 40.0001 32 31.2516C24.1583 25.2861 20.3103 16.5351 20.3103 16.5351M20.3103 16.5351C16.694 8.47243 9.83655 1.00014 1 1.00014C1 1.00014 4.21757 0.00019145 10.3588 4.00014C16.5 8.00008 20.3103 16.5351 20.3103 16.5351Z"
            stroke="url(#grad)"
            stroke-width="0.5"
            fill="none"
          />
        </G>
      ) : null}
    </Svg>
  );
};

export const BackgroundTabbar = memo(Component, isEqual);
