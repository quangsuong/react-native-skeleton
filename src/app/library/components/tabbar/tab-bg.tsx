import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps & {
  color?: string;
};

export const TabBg: React.FC<Props> = ({ color = '#FFFFFF', ...props }) => {
  return (
    <Svg width={130} height={61} viewBox="0 0 130 61" {...props}>
      <Path
        d="M132 8.23504L131.825 61H0V0.0621509C5.93146 0 13 0 28 9.71631C43 20.8201 39.6 22.8339 64.8 26.2885C91.2 22.3401 83.8 19.0921 100.6 8.23504C116.8 0 126.88 0 132 0V8.23504Z"
        fill={color}
      />
    </Svg>
  );
};
