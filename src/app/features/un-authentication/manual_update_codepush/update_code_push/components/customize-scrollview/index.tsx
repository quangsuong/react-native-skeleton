import { Block } from '@components';
import { useTheme } from '@theme';
import { Utils } from '@utils/utils';
import { isEqual } from 'lodash';
import React, { memo, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
  ScrollViewPropsAndroid,
  ScrollViewPropsIOS,
  Touchable,
  ViewProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useStyleCustomScrollView from './styles';
type Props = ScrollViewProps &
  ViewProps &
  ScrollViewPropsIOS &
  ScrollViewPropsAndroid &
  Touchable & { containerStyle?: any };
const Component = (props: Props) => {
  const { colors } = useTheme();
  const styles = useStyleCustomScrollView();
  const [isTop, setIsTop] = useState<boolean>(false);
  const [isBottom, setIsBottom] = useState<boolean>(true);
  const color1 = Utils.convertHEXToRGBA(colors.color_50, 0);
  const color2 = Utils.convertHEXToRGBA(colors.color_50, 0.25);
  const color3 = Utils.convertHEXToRGBA(colors.color_50, 0.5);
  const color4 = Utils.convertHEXToRGBA(colors.color_50, 0.75);
  const color5 = Utils.convertHEXToRGBA(colors.color_50, 1);
  const renderBottom = () => {
    return (
      <LinearGradient
        colors={[color1, color2, color3, color4, color5]}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={styles.gradientBottom}
      />
    );
  };
  const renderTop = () => {
    return (
      <LinearGradient
        colors={[color5, color4, color3, color2, color1]}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={styles.gradientTop}
      />
    );
  };
  const _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event?.nativeEvent?.contentOffset?.y || 0;
    const height = event?.nativeEvent?.layoutMeasurement?.height || 0;
    const heightContainer = event?.nativeEvent?.contentSize?.height || 0;
    const _isTop = y > 0;
    const _isBottom = y + height + 45 < heightContainer;
    if (_isTop !== isTop) {
      setIsTop(_isTop);
    }
    if (_isBottom !== isBottom) {
      setIsBottom(_isBottom);
    }
  };
  return (
    <Block style={props?.containerStyle || { flex: 1 }}>
      {isTop ? renderTop() : null}
      {isBottom ? renderBottom() : null}
      <ScrollView {...props} onScroll={_onScroll} />
    </Block>
  );
};
const MScrollView = memo(Component, isEqual);
export default MScrollView;
