import { BottomSheet } from '@components/bottom-sheet';
import { useCallback, useImperativeHandle, useRef } from 'react';
import { useBackHandler } from './useBackHandler';

export default function useActionModal(props?: any, ref?: any) {
  const modalizeRef = useRef<BottomSheet>(null);

  const showModal = useCallback(() => {
    modalizeRef.current?.openBottomSheet();
  }, []);

  const hideModal = useCallback(() => {
    modalizeRef.current?.closeBottomSheet();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      openBottomSheet: () => {
        showModal();
      },
      closeBottomSheet: () => {
        modalizeRef.current?.closeBottomSheet();
      },
    }),
    []
  );

  const handleBackButton = useCallback(() => {
    hideModal();

    const isClose = modalizeRef.current?.getCloseState();
    return isClose !== true && isClose !== undefined;
    // goBack();
    // return true;
  }, []);
  useBackHandler(handleBackButton);

  return {
    modalizeRef,
    showModal,
    hideModal,
  };
}
