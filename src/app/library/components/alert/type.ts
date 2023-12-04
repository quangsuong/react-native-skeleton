import { IconSvgTypes } from '@assets/icon';
import { ReactNode } from 'react';

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
  onPress?: (index?: number) => void;
  type?: TypeAction;
  typeMessage?: TypeMessage;
  index?: number;
  iconName?: IconSvgTypes;
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
  contentComponent?: ReactNode;
  disableTouchOutSide?: boolean;
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
  contentComponent: undefined,
  disableTouchOutSide: false,
};
