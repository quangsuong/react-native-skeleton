import { APP_SCREEN } from '@navigation/screen-types';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@theme';
import { useMemo } from 'react';
import { K_SCREEN_WIDTH } from '../common/constant';

interface CustomThemeHookProps {
  theme: any;
  forceUseImage?: boolean;
}

function useCustomThemeHook({ theme, forceUseImage }: CustomThemeHookProps) {
  const { name } = useRoute();
  const { colors } = useTheme();

  const isSuccessBackground = useMemo(() => {
    const regexParams = [APP_SCREEN.MY_QR_CODE].join('|');
    const regex = new RegExp(regexParams);
    return regex.test(name) || forceUseImage;
  }, [forceUseImage]);

  const customStyleImageHeader = useMemo(() => {
    switch (theme) {
      case 'dark':
        return { height: (K_SCREEN_WIDTH * 815) / 375 };
      case 'priority':
        if (isSuccessBackground) return { height: (K_SCREEN_WIDTH * 815) / 375 };
    }
  }, [theme, isSuccessBackground]);

  const bgHeader = useMemo(() => {
    switch (theme) {
      case 'priority':
        return isSuccessBackground ? 'bg_trans_success' : 'background_header_priority';
      case 'dark':
        return isSuccessBackground ? 'background_header_dark' : 'bg_dark';
      default:
        return 'background_header';
    }
  }, [theme]);

  return {
    bgHeader,
    customStyleImageHeader,
  };
}

export default useCustomThemeHook;
