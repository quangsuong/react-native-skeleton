import { IconSvgLocal } from '@components/icon-vec-local';
import { useTheme } from '@theme';
import React, { memo } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import useStyle from './styles';
import useItemOverlayHooks from './useItemOverlayHooks';

const DeleteOverlay = ({
  index,
  onDelPress,
  style,
}: {
  index: number;
  onDelPress: (index: number) => void;
  style?: ViewStyle;
}) => {
  const { colors } = useTheme();
  const styles = useStyle();
  const { onPress } = useItemOverlayHooks({ index, onDelPress });

  return (
    <TouchableOpacity style={[styles.delBtn, style]} onPress={onPress}>
      <IconSvgLocal name={'IC_REMOVE_SERVICE'} color={colors.color_700} />
    </TouchableOpacity>
  );
};

export default memo(DeleteOverlay);
