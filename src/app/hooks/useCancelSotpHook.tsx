import { logout } from '@common';
import { useToast } from '@customHooks/useToast';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {}
const useCancelSotpHook = (props: Props) => {
  const [t] = useTranslation();
  const toast = useToast();
  const [term1, setTerm1] = useState<boolean>(false);
  const [term2, setTerm2] = useState<boolean>(false);

  const onConfirmCancel = useCallback(() => {
    toast.show(t('text:sotp_cancel_service_success'));
    logout();
  }, []);

  return {
    term1,
    term2,
    setTerm1,
    setTerm2,
    onConfirmCancel,
  };
};

export default useCancelSotpHook;
