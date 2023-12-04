import { Block } from '@components/block';
import { useDisableBackHandler } from '@hooks';
import { useTheme } from '@theme';
import React, {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSuggestionViewStyle } from './styles';
import { StepType } from './type';

import { AnimationFiles } from '@assets/animation';
import { IconSvgs } from '@assets/icon';
import { dispatch, K_SCREEN_WIDTH, K_SIZE_60, sizeScale } from '@common';
import { Button } from '@components/button';
import { Spacer } from '@components/spacer';
import { Text } from '@components/text';
import { BorderRadius, Space } from '@foundation';
import { selectEnableIntruction } from '@redux-selector/app';
import { commonActions } from '@redux-slice';
import get from 'lodash/get';
import Lottie from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import {
  ERNHoleViewTimingFunction,
  IRNHoleViewAnimation,
  RNHoleView,
} from 'react-native-hole-view';
import { useSelector } from 'react-redux';

const animationSettings: IRNHoleViewAnimation = {
  timingFunction: ERNHoleViewTimingFunction.EASE_IN_OUT,
  duration: 200,
};

const BlockAnimated = Animated.createAnimatedComponent(Block);
const Component = forwardRef((_, ref) => {
  const [holes, setHoles] = useState<StepType[]>();
  const [step, setStep] = useState<number>(0);
  const [isShow, setIsShow] = useState<boolean>(false);
  const styles = useSuggestionViewStyle();
  const { colors } = useTheme();
  const [t] = useTranslation();
  let scrollRef = useRef<ScrollView>(null);

  const enableShowInstruction = useSelector(selectEnableIntruction);

  useDisableBackHandler(isShow);

  const addScrollRef = useCallback(
    (_scrollRef?: any) => {
      scrollRef = _scrollRef;
    },
    [scrollRef]
  );

  const nextStep = useCallback(() => {
    if (step <= (holes || [])?.length - 1) {
      setStep(step + 1);
    }
  }, [step, holes]);

  const prevStep = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const show = useCallback(() => {
    if (enableShowInstruction) {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
      setIsShow(true);
    }
  }, [scrollRef, enableShowInstruction]);

  const addStep = useCallback(
    (step: StepType) => {
      let list: StepType[] = [];
      if (holes && holes.length > 0) {
        list = [...holes, step];
      } else {
        list.push(step);
      }
      list = list.sort((a, b) => {
        return a.index > b.index ? 1 : -1;
      });
      if (list.length > 0) {
        setHoles(list);
      }
    },
    [holes]
  );

  const hide = useCallback(() => {
    setIsShow(false);
    setHoles(undefined);
    setStep(0);
    dispatch(commonActions.showIntructionInHome(true));
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      show,
      addStep,
      nextStep,
      prevStep,
      addScrollRef,
    }),
    [holes, step]
  );

  const _renderAnimation = useCallback(() => {
    let source = AnimationFiles.ic_touch;
    switch (step) {
      case 0:
        source = AnimationFiles.ic_shake;
        break;
      case 1:
        source = AnimationFiles.ic_touch;
        break;
      case 2:
        source = AnimationFiles.ic_arrow;
        break;
    }
    return (
      <Lottie
        autoPlay
        autoSize
        source={source}
        style={step === 2 ? styles.animation_touch : styles.animation}
        resizeMode="cover"
      />
    );
  }, [step]);

  const _renderAction = useCallback(() => {
    if (step === 0 || step === 1) {
      let description = (
        <Text preset="body2" color={colors.color_1000}>
          {t('text:gesture_suggestion1')}{' '}
          <Text preset="body2" t18n={'text:gesture_suggestion2'} color={colors.primary} />
        </Text>
      );
      if (step === 1) {
        description = (
          <Text preset="body2" color={colors.color_1000}>
            <Text preset="body2" t18n={'text:touch_fast1'} color={colors.primary} />
            {t('text:touch_fast2')}
          </Text>
        );
      }
      return (
        <Block
          marginTop={Space.spacing_l}
          padding={Space.spacing_m}
          color={`${colors.color_0}E6`}
          borderRadius={BorderRadius.border_radius_l}
        >
          {description}
          <Spacer height={Space.spacing_xl} />
          <Button name="suggestion_next" onPress={nextStep} style={styles.button_wrap} forIcon>
            <Text t18n={'text:continue'} color={colors.color_link_500} preset={'body1'} />
            <IconSvgs.ICON_ARROW_RIGHT
              color={colors.color_link_500}
              width={sizeScale(20)}
              height={sizeScale(20)}
            />
          </Button>
        </Block>
      );
    }
    return (
      <Block
        marginTop={Space.spacing_l}
        padding={Space.spacing_m}
        color={colors.color_0}
        borderRadius={BorderRadius.border_radius_l}
        marginRight={Space.spacing_m}
      >
        <Text preset="body2" color={colors.color_1000}>
          <Text preset="body2" t18n={'text:scan_qr'} color={colors.primary} />
          {t('text:scan_suggestion2')}
        </Text>
        <Spacer height={Space.spacing_xl} />
        <Button name="suggestion_next_2" onPress={hide} style={styles.button_wrap} forIcon>
          <Text t18n={'text:understand'} color={colors.color_link_500} preset={'body1'} />
        </Button>
      </Block>
    );
  }, [nextStep]);

  const _renderActionStep = useCallback(() => {
    if (holes && (holes || []).length > step) {
      const hole = get(holes, `[${step}].hole`, { y: 0, height: 0 });
      if (!hole) return null;
      if (step < 2) {
        return (
          <Block
            position="absolute"
            top={hole.y + hole.height + Space.spacing_s}
            alignItems={'center'}
            alignSelf={'center'}
            maxWidth={K_SCREEN_WIDTH - Space.spacing_3xl}
          >
            {_renderAnimation()}
            {_renderAction()}
          </Block>
        );
      }

      return (
        <Block
          position="absolute"
          top={hole.y - 96 - K_SIZE_60 / 2 - Space.spacing_m}
          alignItems={'center'}
          alignSelf={'flex-end'}
          maxWidth={K_SCREEN_WIDTH - 2 * Space.spacing_xl}
        >
          {_renderAction()}
          {_renderAnimation()}
        </Block>
      );
    }
    return null;
  }, [holes, step]);

  // render
  return isShow && (holes || []).length > 0 ? (
    <BlockAnimated
      pointerEvents={'box-none'}
      entering={FadeIn}
      exiting={FadeOut}
      style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <Block style={styles.full} zIndex={0}>
        <RNHoleView
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'rgba(0,0,0,.8)',
            },
          ]}
          animation={animationSettings}
          holes={holes ? (holes[step]?.hole ? [holes[step]?.hole] : []) : []}
          onAnimationFinished={() => {}}
        />
        {_renderActionStep()}
      </Block>
    </BlockAnimated>
  ) : null;
});

type SuggestionType = {
  show: () => void;
  addStep: (step: StepType) => void;
  nextStep: () => void;
  prevStep: () => void;
  addScrollRef: (scrollRef?: React.RefObject<ScrollView>) => void;
};
export const SuggestionRef = createRef<SuggestionType>();
export const SuggestionView = () => <Component ref={SuggestionRef} />;

export const showSuggestion = () => {
  SuggestionRef.current?.show();
};

export const addScrollRef = (scrollRef?: React.RefObject<ScrollView>) => {
  SuggestionRef.current?.addScrollRef(scrollRef);
};

export const addStep = (props: StepType) => {
  SuggestionRef.current?.addStep(props);
};

export const nextStep = () => {
  SuggestionRef.current?.nextStep();
};

export const prevStep = () => {
  SuggestionRef.current?.prevStep();
};
