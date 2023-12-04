import { AnimationFiles } from '@assets/animation';
import {
  K_MARGIN_16,
  K_MARGIN_24,
  K_PADDING_10,
  K_PADDING_16,
  K_PADDING_24,
  K_PADDING_8,
  sizeScale,
} from '@common';
import { Block, Button, Spacer, Text } from '@components';
import { IconSvgLocal } from '@components/icon-vec-local';
import useUpdateCodePush from '@customHooks/useUpdateCodePushDetailVersion';
import { useTheme } from '@theme';
import LottieView from 'lottie-react-native';
import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import MScrollView from './components/customize-scrollview';
import { useStyle } from './styles';
export interface UpdateViewProps {
  onUpdate: () => void;
  onHide?: () => void;
  isForce: boolean;
}

const Component = ({ onUpdate, onHide, isForce }: UpdateViewProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = useStyle();
  const { package_size, appVersion, description, logoPVCB } = useUpdateCodePush();

  const hideBlock = useMemo(() => {
    if (isForce) return null;
    return (
      <>
        <Block
          zIndex={1000}
          position="absolute"
          top={sizeScale(60)}
          right={0}
          paddingBottom={K_PADDING_24}
          paddingHorizontal={K_PADDING_16}
        >
          <Button name="close_codepush" onPress={onHide}>
            <IconSvgLocal name="IC_CLOSE" color={colors.color_900} />
          </Button>
        </Block>
      </>
    );
  }, [onHide]);

  // render
  return (
    <Block color={colors.color_50} style={[StyleSheet.absoluteFill, styles.container]}>
      <Block position={'absolute'} top={0} right={0}>
        <IconSvgLocal name={logoPVCB} width={sizeScale(183)} height={sizeScale(269)} />
      </Block>
      {hideBlock}
      <Block flex={1}>
        <Block
          marginTop={sizeScale(100)}
          width={sizeScale(113)}
          height={sizeScale(132)}
          borderRadius={sizeScale(12)}
          paddingHorizontal={sizeScale(K_PADDING_16)}
          paddingTop={sizeScale(K_PADDING_16)}
          paddingBottom={sizeScale(K_PADDING_16)}
        >
          <Block position="absolute">
            <IconSvgLocal name="STROKE_VERSION1" width={sizeScale(113)} height={sizeScale(132)} />
          </Block>
          <LottieView
            autoPlay={true}
            loop={true}
            source={AnimationFiles.ic_rocket}
            colorFilters={[
              { keypath: 'Than', color: colors.color_900 },
              { keypath: 'Giua', color: colors.color_900 },
              { keypath: 'Phai', color: colors.color_900 },
              { keypath: 'Trai', color: colors.color_900 },
              { keypath: 'Duoi 4', color: colors.color_900 },
            ]}
            style={{
              width: sizeScale(40),
              height: sizeScale(40),
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          />
          {/* <Spacer height={sizeScale(K_MARGIN_16)} /> */}
          <Text
            text={appVersion}
            preset={'h3'}
            color={colors.color_900}
            style={{ maxWidth: sizeScale(81) }}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          />
          <Text
            text={t('text:updates')}
            preset={'body1'}
            color={colors.color_700}
            style={{ maxWidth: sizeScale(81) }}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          />
        </Block>
        <Spacer height={57} />
        <Text text={t('text:slogan_dev_bank')} preset={'title5'} color={colors.color_800} />
        <Spacer height={K_PADDING_8} />
        <Text
          text={`${t('text:package_size')} ${package_size}`}
          preset={'caption1'}
          color={colors.color_700}
        />
        <Spacer height={K_MARGIN_24} />
        <Text text={t('text:whatnew')} preset={'body1'} color={colors.color_800} />
        <Block flex={1} marginBottom={sizeScale(K_MARGIN_16)} marginTop={K_PADDING_8}>
          <MScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.contentContainerStyleDesc}
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
          >
            <Text text={description} preset={'body1'} color={colors.color_800} />
          </MScrollView>
        </Block>
      </Block>
      <Button
        name="download_code_push"
        center
        type={'primary'}
        onPress={onUpdate}
        style={styles.downloadBtn}
      >
        <IconSvgLocal name="IC_DOWNLOAD" color={colors.color_0} />
        <Spacer width={K_PADDING_10} />
        <Text t18n={'text:update_now'} preset="subtitle2" color={colors.color_0} />
      </Button>
    </Block>
  );
};

export const UpdateView = memo(Component, isEqual);
