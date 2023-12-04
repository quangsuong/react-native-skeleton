import { IconProps } from 'react-native-vector-icons/Icon';

export enum IconType {
  AntDesign = 'AntDesign',
  Entypo = 'Entypo',
  EvilIcons = 'EvilIcons',
  Feather = 'Feather',
  FontAwesome = 'FontAwesome',
  FontAwesome5 = 'FontAwesome5',
  FontAwesome5Pro = 'FontAwesome5Pro',
  Fontisto = 'Fontisto',
  Foundation = 'Foundation',
  Ionicons = 'Ionicons',
  MaterialIcons = 'MaterialIcons',
  MaterialCommunityIcons = 'MaterialCommunityIcons',
  Octicons = 'Octicons',
  Zocial = 'Zocial',
  SimpleLineIcons = 'SimpleLineIcons',
}

export interface IconVecProps extends IconProps {
  name: string;
  type: keyof typeof IconType | IconType.AntDesign;
}
