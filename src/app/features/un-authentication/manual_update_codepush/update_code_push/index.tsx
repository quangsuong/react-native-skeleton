import { AnimationFiles } from '@assets/animation';
import { K_PADDING_10, K_PADDING_16, K_PADDING_24, sizeScale } from '@common';
import { Block, Button, Screen, Spacer, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import useCodePushHook from '@customHooks/useCodePushHook';
import { Space } from '@foundation';
import { selectCodePushVersion } from '@redux-selector/app';
import { useTheme } from '@theme';
import versionHelper from '@utils/version-helper';
import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { LottieComponent } from 'src/app/common/components/LottieComponent';
import { useStyle } from './styles';
import { UpdateView } from './UpdateView';

const FadeBlock = Animated.createAnimatedComponent(Block);

const Component = () => {
  const styles = useStyle();
  const { colors, dark } = useTheme();
  const { t } = useTranslation();
  const {
    processUpdate,
    updating,
    updatePercent: _updatePercent,
    isForce,
    onHide,
  } = useCodePushHook();
  const updateDetail = useSelector(selectCodePushVersion);
  const insets = useSafeAreaInsets();

  const updatePercent = useMemo(() => Math.max(_updatePercent, 1), [_updatePercent]);
  const version = useMemo(
    () => versionHelper.getVerionCodePush(updateDetail?.appVersion, updateDetail?.label),
    [updateDetail?.appVersion, updateDetail?.label]
  );

  const circular = useMemo(
    () => ({
      size: sizeScale(60),
      radius: sizeScale(30),
    }),
    []
  );

  const content = useMemo(() => {
    if (updating) {
      const percentText = updatePercent + '%';
      return (
        <>
          <Block
            height={circular.size}
            width={circular.size}
            borderRadius={circular.radius}
            justifyContent="center"
            alignItems="center"
            marginVertical={K_PADDING_24}
          >
            <Block position="absolute" style={styles.circleProgress}>
              <CircularProgress
                value={updatePercent}
                radius={circular.radius}
                duration={0}
                showProgressValue={false}
                activeStrokeColor={colors.color_primary_500}
                inActiveStrokeColor={colors.color_50}
                activeStrokeWidth={sizeScale(5)}
                inActiveStrokeWidth={sizeScale(5)}
                circleBackgroundColor={colors.color_100}
                allowFontScaling={false}
              />
            </Block>
            <Text text={updatePercent + '%'} preset="body1" />
          </Block>
          <Text
            center
            preset="title3"
            text={percentText}
            t18n={'text:updating_version'}
            t18nOptions={{ version }}
          />
          <Spacer height={Space.spacing_xs} />
          <Text center preset="body3" color={colors.color_800} t18n="text:wating_for_update" />
        </>
      );
    }

    return (
      <Button
        name="download_code_push"
        center
        type={'primary'}
        onPress={processUpdate}
        style={styles.downloadBtn}
      >
        <IconSvgLocal name="IC_DOWNLOAD" color={colors.color_0} />
        <Spacer width={K_PADDING_10} />
        <Text t18n={'text:update_now'} preset="subtitle2" color={colors.color_0} />
      </Button>
    );
  }, [colors, updating, updatePercent, version]);

  const isUpdated = useMemo(() => updatePercent == 100, [updatePercent]);
  // const isUpdated = useMemo(() => updatePercent > 10, [updatePercent])

  const frames = useMemo(() => {
    if (!isUpdated) {
      return {
        startFrame: 0,
        endFrame: 38,
      };
    }

    return {
      startFrame: 38,
      endFrame: 66,
    };
  }, [isUpdated]);

  // render
  return (
    <Screen name={'SCREEN_CODE_PUSH_UPDATE'}>
      <FadeBlock entering={FadeIn} exiting={FadeOut} flex={1}>
        <Block flex={1} color={colors.color_50}>
          <Block style={StyleSheet.absoluteFill}>
            <Block paddingHorizontal={K_PADDING_16} alignItems="center">
              <Block
                paddingHorizontal={K_PADDING_24}
                height={sizeScale(390)}
                width={sizeScale(260)}
                alignItems="center"
                justifyContent="flex-end"
              >
                <LottieComponent
                  source={AnimationFiles.rocket_codepush_fly}
                  style={{ width: sizeScale(260) }}
                  resizeMode="cover"
                  loop={!isUpdated}
                  {...frames}
                  autoPlay
                />
              </Block>
              {content}
            </Block>
          </Block>
        </Block>
        {!updating && <UpdateView isForce={isForce} onUpdate={processUpdate} onHide={onHide} />}
      </FadeBlock>
    </Screen>
  );
};

export const UpdateCodePush = memo(Component, isEqual);
