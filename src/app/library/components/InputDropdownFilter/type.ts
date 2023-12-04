import { StyleProp, ViewStyle } from 'react-native';

export interface ItemList {
  id: string | number;
  name?: string;
  title?: string;
}
export interface IProps {
  wapperStyle?: StyleProp<ViewStyle>;
  data?: Array<unknown>;
  title?: string;
  placeholder?: string;
  hideSearch?: boolean;
  onEndReached?: () => void;
  onChangeTextSearch?: (value: string) => void;
  sectionList?: boolean;
  listSelect: ItemList[];
  onSetList: (param: ItemList[]) => void;
  limit: number;
  showRightIcon?: boolean;
  onPressItem: (data: any) => void;
  placeholderModal: string;
  titleModal: string;
  onChangeValue?: (value: string) => void;
  onChangeText?: (value: string) => void;
  renderEmpty?: () => void;
  textLoading?: string;
  listStyle?: StyleProp<ViewStyle>;
  valueSelected: string;
  styleSeparator: StyleProp<ViewStyle>;
  renderBottom: () => void;
  isLoading: boolean;
  onSelected: (param: any) => void;
}
