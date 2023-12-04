import React from 'react';
import CarouselOrg, { TCarouselProps } from 'react-native-reanimated-carousel';

type CarouselProps = TCarouselProps;

export const Carousel = (props: CarouselProps) => {
  // render
  return <CarouselOrg {...props} />;
};
