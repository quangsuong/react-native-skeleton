import { K_IS_IOS } from '@common';
export const FontDefault = {
  primary: K_IS_IOS ? 'SF Pro Display' : 'Roboto',
};

export type FontFamily = keyof typeof FontDefault;
