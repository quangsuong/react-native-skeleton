import { IconSvgs } from '@assets/icon';
import { K_IS_IOS, K_SIZE_SCALE_56, K_SIZE_SCALE_72 } from '@common';
import { Block } from '@components/block';
import { StepOnboarding } from '@components/step-onboarding';
import { Text } from '@components/text';
import { TextPresetNames } from '@components/text/preset';
import useTracking from '@customHooks/useButton';
import { Space } from '@foundation';
import { goBack } from '@navigation/navigation-service';
import { useTheme } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';
import { isEqual } from 'lodash';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewProps } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OnboardingHeaderProps extends ViewProps {
  t18n?: I18nKeys;
  subTitle?: string;
  onPressBack?: () => void;
  isBack?: boolean;
  currentStep: number;
  totalStep?: number;
  presetTitle?: TextPresetNames;
}

const OnboardingHeaderComp = (props: OnboardingHeaderProps) => {
  const {
    subTitle,
    t18n,
    onPressBack,
    isBack = true,
    currentStep,
    totalStep = 5,
    presetTitle,
  } = props;
  const { onPressTracking } = useTracking({
    ...props,
    action: 'Back',
    section: 'Header',
  });
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  // state
  const [t] = useTranslation();
  const i18nText = useMemo(() => t18n && t(t18n), [t18n, t]);

  const subNextStep = useMemo(() => subTitle && t(subTitle), [subTitle, t]);

  const _onPress = useCallback(() => {
    if (onPressBack) {
      onPressBack();
    } else {
      goBack();
    }
    onPressTracking();
  }, []);

  const _renerTitle = useMemo(() => {
    return (
      <Block>
        <Text text={i18nText || ''} preset={presetTitle ?? 'title4'} color={colors.color_800} />
        {subNextStep && (
          <Text
            preset="body1"
            text={`${t('text:next_step')} ${subNextStep}`}
            color={colors.color_700}
          />
        )}
      </Block>
    );
  }, [i18nText]);

  // render
  const _renderStep = useMemo(() => {
    return <StepOnboarding size={K_SIZE_SCALE_56} step={currentStep} max={totalStep} />;
  }, [currentStep, totalStep]);

  return (
    <Appbar.Header
      style={{
        backgroundColor: colors.color_50,
        height: K_SIZE_SCALE_72 + (K_IS_IOS ? 0 : insets.top),
        justifyContent: 'space-between',
        paddingRight: Space.spacing_m,
        paddingTop: +(K_IS_IOS ? 0 : insets.top),
      }}
      mode={'center-aligned'}
    >
      <Block direction="row" middle>
        {isBack ? (
          <Appbar.Action
            icon={IconSvgs['IC_ARROW_LEFT']}
            onPress={_onPress}
            color={colors.color_900}
          />
        ) : null}
        {_renerTitle}
      </Block>
      {_renderStep}
    </Appbar.Header>
  );
};
export const OnboardingHeader = memo(OnboardingHeaderComp, isEqual);
