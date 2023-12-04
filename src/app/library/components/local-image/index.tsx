import React from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { Images } from '@assets/image';

import { Icons } from '@assets/icon';
import { styles } from './styles';
import { LocalImageProps } from './type';

interface Props extends LocalImageProps {
  type?: 'image' | 'icon';
  tintColor?: string;
}

export const LocalImage = ({
  source,
  containerStyle,
  style: styleOverride,
  resizeMode = 'cover',
  type = 'image',
  tintColor,
}: Props) => {
  const sourceImage = { image: Images, icon: Icons };
  // render
  return (
    <View style={containerStyle}>
      <FastImage
        tintColor={tintColor}
        style={[styles.img, styleOverride]}
        resizeMode={resizeMode}
        source={sourceImage[type][source ?? 'default']}
      />
    </View>
  );
};
