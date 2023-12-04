import { TextStyle, ViewStyle } from 'react-native';

export interface SegmentedControlProps {
  /**
   * The Segments Text Array
   */
  segments: Array<string>;
  /**
   * The Current Active Segment Index
   */
  currentIndex: number;
  /**
   * A callback onPress of a Segment
   */
  onChange: (index: number) => void;
  /**
   * An array of Badge Values corresponding to the Segment
   */
  badgeValues?: Array<number | null>;
  /**
   * Is right-to-left mode.
   */
  isRTL?: boolean;
  /**
   * The container margin for the segmented control
   * Used to calculate the width of Segmented Control
   */
  containerMargin?: number;
  /**
   * Active Segment Text Style
   */
  activeTextStyle?: TextStyle;
  /**
   * InActive Segment Text Style
   */
  inactiveTextStyle?: TextStyle;
  /**
   * Segment Container Styles
   */
  segmentedControlWrapper?: ViewStyle;
  /**
   * Pressable Container Styles
   */
  pressableWrapper?: ViewStyle;
  /**
   * The moving Tile Container Styles
   */
  tileStyle?: ViewStyle;
  /**
   * Active Badge Styles
   */
  activeBadgeStyle?: ViewStyle;
  /**
   * Inactive Badge Styles
   */
  inactiveBadgeStyle?: ViewStyle;
  /**
   * Badge Text Styles
   */
  badgeTextStyle?: TextStyle;
}
