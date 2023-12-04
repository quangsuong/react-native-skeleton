import { AnimationFiles } from '@assets/animation';
import {
  K_IS_IOS,
  K_SCREEN_WIDTH,
  K_SIZE_36,
  K_SIZE_37,
  K_SIZE_6,
  K_SIZE_64,
  K_SIZE_7,
  K_SIZE_94,
} from '@common';
import { BackgroundTabbar } from '@components/background-tabbar';
import { Block } from '@components/block';
import { LocalImage } from '@components/local-image';
import { Space } from '@foundation';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@theme';
import Lottie from 'lottie-react-native';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ItemTabbar from './item-tabbar';

const HEIGHT_BOTTOM_BAR = 68;

export const CustomTabbar = (props: BottomTabBarProps) => {
  const { state, navigation } = props;
  const [t] = useTranslation();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyle();

  return (
    <Block style={styles.container}>
      <LocalImage source={'ic_bottom_bar'} style={styles.ic_bottom_bar} resizeMode={'contain'} />
      <Block position={'absolute'} left={0} right={0} top={10} style={styles.ic_bottom_bar_wrap}>
        <BackgroundTabbar />
      </Block>
      <Block
        position={'absolute'}
        left={Space.spacing_xs}
        right={Space.spacing_xs}
        direction={'row'}
        justifyContent={'space-around'}
        alignItems={'center'}
      >
        {state.routes.map((route, index) => {
          return (
            <ItemTabbar key={route?.key} state={state} index={index} navigation={navigation} />
          );
        })}
      </Block>
      <Block
        position={'absolute'}
        zIndex={11}
        bottom={(K_IS_IOS ? K_SIZE_6 : K_SIZE_7) + insets.bottom}
        alignSelf={'center'}
      >
        <LocalImage source={'bg_scan_tab'} style={styles.ic_qr} resizeMode={'cover'} />
      </Block>
      <Block
        position={'absolute'}
        zIndex={22}
        bottom={(K_IS_IOS ? K_SIZE_36 : K_SIZE_37) + insets.bottom}
        alignSelf={'center'}
      >
        <Block collapsable={false}>
          <Lottie
            autoPlay
            source={AnimationFiles.ic_qr}
            style={styles.qr_wrap}
            resizeMode="cover"
          />
        </Block>
      </Block>
      <Block color={colors.color_50} height={insets.bottom} />
    </Block>
  );
};

export const useStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
        },
        ic_bottom_bar_wrap: {
          width: K_SCREEN_WIDTH,
          height: (K_SCREEN_WIDTH * HEIGHT_BOTTOM_BAR) / 375 + (K_IS_IOS ? 3 : 9),
        },
        ic_bottom_bar: {
          width: K_SCREEN_WIDTH,
          height: (K_SCREEN_WIDTH * HEIGHT_BOTTOM_BAR) / 375 + (K_IS_IOS ? 3 : 9),
        },
        ic_qr: { width: K_SIZE_94, height: K_SIZE_94 },
        qr_wrap: { width: K_SIZE_64, height: K_SIZE_64 },
      }),
    [colors]
  );
};
