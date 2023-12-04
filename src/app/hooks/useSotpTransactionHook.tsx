import { navigate, setParams } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useCallback, useState } from 'react';

interface SubmitProps {
  pin?: string;
}

interface Props {}

const useSotpTransactionHook = (props: Props) => {
  const [transactionId, setTransactionId] = useState<string>();

  const onSubmit = () => {
    navigate(APP_SCREEN.GENERATED_SOTP);
    setParams({ transactionId });
  };

  const onScanQR = useCallback(() => {
    alert('Scan QR');
  }, []);

  return {
    transactionId,
    setTransactionId,
    onSubmit,
    onScanQR,
  };
};

export default useSotpTransactionHook;
