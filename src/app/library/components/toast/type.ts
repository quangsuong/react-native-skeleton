import { IconSvgTypes } from '@assets/icon';
import { GestureResponderEvent } from 'react-native';

export const TYPE_MESSAGE = {
  ALERT: 'alert',
  CONFIRM: 'confirm',
  TEXT_LINK: 'Textlink',
} as const;

export const TYPE_ACTION = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LINK: 'link',
} as const;

export type TypeMessage = (typeof TYPE_MESSAGE)[keyof typeof TYPE_MESSAGE];
export type TypeAction = (typeof TYPE_ACTION)[keyof typeof TYPE_ACTION];

export interface ActionProps {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  type?: TypeAction;
  typeMessage?: TypeMessage;
  index?: number;
}

export interface ImageProps {
  name: IconSvgTypes;
  width?: number;
  height: number;
}

export interface AlertProps {
  title: string;
  content: string;
  image?: ImageProps;
  type?: TypeMessage;
  actions?: ActionProps[];
}

interface StateType extends AlertProps {
  isShow: boolean;
}

export const stateDefault: StateType = {
  title: '',
  content: '',
  type: 'alert',
  isShow: false,
  actions: undefined,
};
