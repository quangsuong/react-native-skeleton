import React, { useMemo } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { IconType, IconVecProps } from './type';

export const IconVec = (props: IconVecProps) => {
  const { type } = props;
  const Icon = useMemo(() => {
    switch (type) {
      case IconType.AntDesign:
        return AntDesign;
      case IconType.Entypo:
        return Entypo;
      case IconType.EvilIcons:
        return EvilIcons;
      case IconType.Feather:
        return Feather;
      case IconType.FontAwesome:
        return FontAwesome;
      case IconType.FontAwesome5:
        return FontAwesome5;
      case IconType.FontAwesome5Pro:
        return FontAwesome5Pro;
      case IconType.Fontisto:
        return Fontisto;
      case IconType.Foundation:
        return Foundation;
      case IconType.Ionicons:
        return Ionicons;
      case IconType.MaterialCommunityIcons:
        return MaterialCommunityIcons;
      case IconType.MaterialIcons:
        return MaterialIcons;
      case IconType.Octicons:
        return Octicons;
      case IconType.SimpleLineIcons:
        return SimpleLineIcons;
      case IconType.Zocial:
        return Zocial;
      default:
        return AntDesign;
    }
  }, [type]);

  //render
  return <Icon {...props} />;
};
