import { Theme, useTheme as useThemeRN } from '@react-navigation/native';
import { ColorDark, ColorDefault, ColorLight, ColorPriority } from '@theme/color';

type ColorDefault = typeof ColorPriority; //typeof ColorDefault;
type ColorLight = typeof ColorLight;

export type Colors = ColorDefault & ColorLight;
export type AppTheme = Theme & { colors: Colors };

const Priority: AppTheme = {
  dark: false,
  //@ts-ignore
  colors: ColorPriority,
};

const Light: AppTheme = {
  dark: false,
  //@ts-ignore
  colors: ColorLight,
};

const Dark: AppTheme = {
  dark: true,
  //@ts-ignore
  colors: ColorDark,
};
export const MyAppTheme = {
  priority: Priority,
  default: Light,
  // light: Light,
  dark: Dark,
};

export type ThemeType = keyof typeof MyAppTheme;
export const Themes = Object.keys(MyAppTheme);

export const useTheme = () => {
  const payload = useThemeRN() as AppTheme;
  return payload;
};
