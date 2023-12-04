// import { AnimationFiles } from "@assets/animation";
import { dispatch } from '@common';
// import { hideLoading } from "@components";
import { hideAlert } from '@components/alert';
import { useDisableBackHandler } from '@hooks';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useRoute } from '@react-navigation/native';
import { SYNC_CODE_PUSH } from '@redux-action-type/others';
import { selectProcessSync, selectSttForcecUpdateApp } from '@redux-selector/app';
import { OthersActions, SttForcecUpdateApp } from '@redux-slice';
// import { useTheme } from "@theme";
// import AnimatedLottieView from "lottie-react-native";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { StyleSheet } from "react-native";
import { useSelector } from 'react-redux';
import { useToast } from './useToast';
// import eventConstant from "../common/constant/eventConstant";
import {
  hideManualCodePushPopup,
  showManualCodePushPopup,
} from '@features/un-authentication/manual_update_codepush/updatePopup';

export default function useCodePushHook() {
  const forceUpdateStatus = useSelector(selectSttForcecUpdateApp);
  const [updating, setUpdating] = useState(false);
  const pendingUpdate = useMemo(() => {
    return [SttForcecUpdateApp.NO_UPDATE, SttForcecUpdateApp.INIT].indexOf(forceUpdateStatus) < 0;
  }, [forceUpdateStatus]);
  const isForce = useMemo(
    () => forceUpdateStatus === SttForcecUpdateApp.REQUIRED,
    [forceUpdateStatus]
  );

  const updatePercent = useSelector(selectProcessSync);
  useDisableBackHandler(isForce);
  const route = useRoute();
  const toast = useToast();
  const { t } = useTranslation();
  // const { colors } = useTheme()

  // const styles = useMemo(() => StyleSheet.create({
  //     rocket: {
  //         height: sizeScale(192),
  //         marginTop: sizeScale(5)
  //     },
  //     btn_update: {
  //         // alignSelf: 'center',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         paddingTop: 5
  //     },
  //     txt_update: {
  //         marginTop: -3,
  //         color: colors.color_0
  //     }
  // }), [colors])

  const expandedUpdate = useCallback(() => {
    // showManualCodePush();
    showManualCodePushPopup();
    hideAlert();
  }, []);

  const forceUpdate = useCallback(() => {
    navigate(APP_SCREEN.SCREEN_CODE_PUSH_UPDATE);
  }, []);

  const onNoUpdate = useCallback(() => {
    toast.show(t('text:newest_version'), { type: 'info' });
  }, []);

  const onUpdate = useCallback(() => {
    if (!pendingUpdate) {
      toast.show(t('text:checking_for_update'), {
        type: 'info',
        duration: 1000,
      });
      return dispatch(OthersActions.checkUpdateCodePush(onNoUpdate));
    }
    if (isForce) {
      forceUpdate();
    } else if (!updatePercent || updatePercent == 100) {
      expandedUpdate();
    }
  }, [pendingUpdate, isForce, updatePercent]);

  useEffect(() => {
    if (isForce) {
      if (route.name !== APP_SCREEN.SCREEN_CODE_PUSH_UPDATE) {
        onUpdate();
      }
    }
  }, [isForce]);

  const processUpdate = useCallback(() => {
    if (isForce) {
      setUpdating(true);
      dispatch({ type: SYNC_CODE_PUSH, payload: { forceRestart: true } });
    } else {
      expandedUpdate();
      goBack();
    }
  }, []);

  const onHide = useCallback(() => {
    if (isForce) {
      return;
    } else {
      hideManualCodePushPopup();
    }
  }, []);

  return {
    pendingUpdate,
    onUpdate,
    processUpdate,
    updating,
    updatePercent,
    isForce,
    onHide,
  };
}
