import { dispatch } from '@common';
import { navigate, popToTop } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { SYNC_CODE_PUSH } from '@redux-action-type/others';
import { selectProcessSync, selectSessionId, selectSttForcecUpdateApp } from '@redux-selector/app';
import { authenticationActions, OthersActions, SttForcecUpdateApp } from '@redux-slice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BackgroundTimer from 'react-native-background-timer';
import { useSelector } from 'react-redux';
import { useToast } from './useToast';

let timeoutId;

export default function useManualCodePushHook() {
  const forceUpdateStatus = useSelector(selectSttForcecUpdateApp);
  const [updating, setUpdating] = useState(false);
  const pendingUpdate = useMemo(
    () => forceUpdateStatus !== SttForcecUpdateApp.NO_UPDATE,
    [forceUpdateStatus]
  );
  const isForce = useMemo(
    () => forceUpdateStatus === SttForcecUpdateApp.REQUIRED,
    [forceUpdateStatus]
  );
  const updatePercent = useSelector(selectProcessSync);
  const sessionId = useSelector(selectSessionId);

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const toast = useToast();
  const { t } = useTranslation();

  const onUpdate = useCallback(() => {
    if (!pendingUpdate) return toast.show(t('text:newest_version'), { type: 'info' });
    navigate(APP_SCREEN.SCREEN_CODE_PUSH_UPDATE);
  }, [pendingUpdate]);

  const isReadyRestart = useMemo(() => updatePercent == 100, [updatePercent]);

  useEffect(() => {
    visible && dispatch({ type: SYNC_CODE_PUSH, payload: { forceRestart: false } });
    if (visible && !isReadyRestart) {
      timeoutId = BackgroundTimer.setTimeout(() => {
        setExpanded(false);
      }, 5000);
    }
  }, [visible]);

  useEffect(() => {
    if (!expanded && timeoutId) {
      BackgroundTimer.clearTimeout(timeoutId);
      timeoutId = null;
    }
  }, [expanded]);

  useEffect(() => {
    if (updatePercent == 100) {
      setExpanded(true);
    }
  }, [updatePercent]);

  const processUpdate = useCallback(() => {
    setUpdating(true);
    dispatch({ type: SYNC_CODE_PUSH, payload: { forceRestart: true } });
  }, []);

  const restartApp = useCallback(() => {
    if (sessionId) {
      dispatch(authenticationActions.clearSession());
    } else {
      popToTop();
    }
    setTimeout(() => {
      dispatch(OthersActions.restartApp());
    }, 1000);
  }, [sessionId]);

  const toggleExpanded = useCallback(() => {
    setExpanded((_expanded) => !_expanded);
  }, []);

  return {
    pendingUpdate,
    onUpdate,
    processUpdate,
    updating,
    updatePercent,
    isForce,
    visible,
    setVisible,
    expanded,
    toggleExpanded,
    isReadyRestart,
    restartApp,
  };
}
