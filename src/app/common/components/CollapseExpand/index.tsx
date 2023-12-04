import { Block, Button, Spacer, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import { Space } from '@foundation';
import { useTheme } from '@theme';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { useStyles } from './style';

interface Props {
  expanded: boolean;
  setExpand: () => void;
}

const Component = (props: Props) => {
  const { colors } = useTheme();
  const styles = useStyles();
  const { expanded, setExpand } = props;

  return (
    <Block direction="row" justifyContent="center">
      <Button onPress={setExpand} name="toggle_expand" style={styles.wrapBtn}>
        <Text
          t18n={expanded ? 'text:show_less' : 'text:more'}
          preset={'body1'}
          color={colors.color_link_500}
        />
        <Spacer width={Space.spacing_xs} />
        <IconSvgLocal
          name={expanded ? 'ICON_ARROW_UP' : 'ICON_ARROW_DOWN'}
          color={colors.color_link_500}
        />
      </Button>
    </Block>
  );
};
export default memo(Component, isEqual);
