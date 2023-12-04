export interface RadioButtonProps {
  /**
   * Default state of radio button
   * @default false
   */
  initialValue?: boolean;

  /**
   * Overwrite value
   * @default undefined
   */
  value?: boolean;

  /**
   * On radio button press
   */
  onToggle?: (value: boolean) => void;

  /**
   * Color when value equal true
   * @default #ff00a9
   */
  activeColor?: string;

  /**
   * Color when value equal false
   * @default #999999
   */
  unActiveColor?: string;

  /**
   * Size of radio button
   * @default 16
   */
  sizeDot?: number;

  /**
   * Stroke width of radio button
   * @default 4
   */
  strokeWidth?: number;

  /**
   * disabled action
   * @default false
   */
  disabled?: boolean;
}
