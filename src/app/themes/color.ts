import { Colors, ColorsDark, ColorsPriority } from '@foundation';

export const ColorDefault = {
  transparent: 'transparent',
  primary: Colors.color_primary_500,
  second: Colors.color_secondary_500,
  title: Colors.color_900,
  placeholder_color: Colors.color_50,
  background_transparent: 'rgba(0,0,0,0.3)',
  gradient_start: Colors.gradient_primary_start,
  gradient_end: Colors.gradient_primary_end,
  error: Colors.color_error_500,
  border: Colors.color_primary_500,
};

export const ColorPriority = {
  ...ColorDefault,
  gradient_btn_start: ColorsPriority.gradient_priority_start,
  gradient_btn_end: ColorsPriority.gradient_priority_end,

  gradient_icon_start: ColorsPriority.gradient_priority_start,
  gradient_icon_end: ColorsPriority.gradient_priority_end,
  title: ColorsPriority.color_primary_500,
  border: ColorsPriority.color_primary_500,

  gradient_start: ColorsPriority.gradient_secondary_start,
  gradient_end: ColorsPriority.gradient_secondary_end,
  true_tone_1: ColorsPriority.color_primary_500,
  true_tone_2: ColorsPriority.color_primary_500,

  ...ColorsPriority,
};

export const ColorLight = {
  ...ColorDefault,

  gradient_btn_start: Colors.color_primary_500,
  gradient_btn_end: Colors.color_primary_500,

  gradient_icon_start: Colors.color_900,
  gradient_icon_end: Colors.color_900,
  true_tone_1: Colors.color_primary_600,
  true_tone_2: Colors.color_900,

  gradient_start: Colors.gradient_secondary_start,
  gradient_end: Colors.gradient_secondary_end,
  ...Colors,
};

export const ColorDark = {
  ...ColorDefault,
  gradient_btn_start: ColorsDark.color_primary_500,
  gradient_btn_end: ColorsDark.color_primary_500,

  gradient_icon_start: ColorsDark.color_900,
  gradient_icon_end: ColorsDark.color_900,
  title: ColorsDark.color_900,
  true_tone_1: ColorsDark.color_primary_600,
  true_tone_2: ColorsDark.color_900,

  gradient_start: Colors.gradient_secondary_start,
  gradient_end: Colors.gradient_secondary_end,
  ...ColorsDark,
};
