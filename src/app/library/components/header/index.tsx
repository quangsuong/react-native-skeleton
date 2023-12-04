import { IconSvgs } from '@assets/icon';
import { K_SIZE_2 } from '@common';
import useTracking from '@customHooks/useButton';
import { Space } from '@foundation';
import { goBack } from '@navigation/navigation-service';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewProps, ViewStyle } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { Block } from '../block/index';
import { Button } from '../button/index';
import { IconSvgLocal } from '../icon-vec-local/index';
import { Spacer } from '../spacer/index';
import { Text } from '../text/index';
import { useHeaderStyle } from './style';

interface Action {
  icon?: IconSource;
  label?: I18nKeys;
  color?: string;
  padding?: number;
  onPress?: () => void;
  badge?: number | string;
}

interface HeaderProps extends ViewProps {
  t18n?: I18nKeys;
  title?: string;
  isBottomLine?: boolean;
  titleColor?: string;
  t18nOptions?: any;
  onPressBack?: () => void;
  isBack?: boolean;
  rights?: Action[];
  lefts?: Action[];
  backgroundColor?: string;
  backStyle?: ViewStyle;
  tintColor?: string;
  TitleComponent?: ReactNode;
  RenderRight?: ReactNode;
}

export const Header = (props: HeaderProps) => {
  const styles = useHeaderStyle();
  const {
    title,
    t18n,
    isBottomLine = true,
    t18nOptions,
    onPressBack,
    lefts,
    rights,
    isBack = true,
    backgroundColor,
    titleColor,
    tintColor,
    TitleComponent,
    RenderRight,
  } = props;
  const { onPressTracking } = useTracking({
    ...props,
    action: 'Back',
    section: 'Header',
  });
  // state
  const [t] = useTranslation();
  const i18nText = useMemo(() => t18n && t(t18n, t18nOptions), [t18n, t18nOptions, t]);
  const onPress = useCallback(() => {
    if (onPressBack) {
      onPressBack();
    } else {
      goBack();
    }
    onPressTracking();
  }, [onPressBack]);
  const { colors } = useTheme();
  const _getBackgroundColor = useMemo(() => {
    return backgroundColor || colors.transparent;
  }, []);

  const _renderAction = useCallback(({ icon, color, label, padding, onPress, badge }, index) => {
    const visibleBadge = badge && badge !== 0 ? true : false;
    if (label && icon) {
      return (
        <Button
          name="actionHeader"
          key={index}
          onPress={onPress}
          style={{ padding: padding || Space.spacing_2xs }}
        >
          <Block direction="row">
            <Text preset="body1" color={color || colors.color_link_500} t18n={label} />
            <Spacer width={Space.spacing_2xs} />
            <IconSvgLocal name={icon} color={color || colors.color_900} />
          </Block>
        </Button>
      );
    }
    if (label) {
      return (
        <Button
          name="actionLabel"
          key={index}
          onPress={onPress}
          style={{ padding: padding || Space.spacing_2xs }}
        >
          <Text preset="body1" color={color || colors.color_link_500} t18n={label} />
        </Button>
      );
    }
    return (
      <Appbar.Header style={{ backgroundColor: _getBackgroundColor }}>
        <Appbar.Action
          key={`${index}`}
          icon={icon}
          color={color || colors.color_900}
          onPress={onPress}
        />
        {visibleBadge ? (
          <Badge style={styles.badge} size={18}>
            {badge}
          </Badge>
        ) : null}
      </Appbar.Header>
    );
  }, []);
  // render
  return (
    <Appbar.Header
      style={{
        backgroundColor: _getBackgroundColor,
        borderBottomColor: colors.gradient_secondary_end,
        borderBottomWidth: isBottomLine ? K_SIZE_2 : 0,
      }}
      mode={'center-aligned'}
    >
      {isBack ? (
        <Appbar.Action
          icon={IconSvgs.IC_ARROW_LEFT}
          onPress={onPress}
          color={tintColor || colors.color_900}
        />
      ) : null}
      {lefts?.map(_renderAction)}
      {TitleComponent ?? (
        <Appbar.Content
          title={
            <Text
              text={i18nText || title || ''}
              preset={'subtitle1'}
              color={titleColor ?? colors.title}
            />
          }
        />
      )}
      {RenderRight ?? rights?.map(_renderAction)}
    </Appbar.Header>
  );
};
