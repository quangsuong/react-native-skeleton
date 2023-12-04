import { isIos, sizeScale } from '@common';
import { Button } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { useTheme } from '@theme';
import React, { memo, ReactNode, useState } from 'react';
import isEqual from 'react-fast-compare';
import Tooltip from 'react-native-walkthrough-tooltip';

type Props = {
  content: ReactNode;
  backgroundColor?: string;
};

const Component = ({ content, backgroundColor }: Props) => {
  const { colors } = useTheme();
  const [show, setShow] = useState(false);

  // render
  return (
    <Tooltip
      showChildInTooltip={false}
      isVisible={show}
      contentStyle={{ backgroundColor: backgroundColor ?? colors.color_800 }}
      content={content}
      childContentSpacing={isIos ? sizeScale(5) : sizeScale(-20)}
      placement="bottom"
      onClose={() => setShow(false)}
    >
      <Button forIcon onPress={() => setShow(true)} name="FATCA_information">
        <IconSvgLocal name="ICON_INFO_FILL" color={colors.color_700} />
      </Button>
    </Tooltip>
  );
};
export const ToolTip = memo(Component, isEqual);
