import { navigate, setParams } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useCallback } from 'react';

interface Props {}
const useAccountDetailHook = (props: Props) => {
  const onViewAccountStatement = useCallback((account) => {
    navigate(APP_SCREEN.ACCOUNT_STATEMENT);
    setParams({ account });
  }, []);

  return {
    onViewAccountStatement,
  };
};

export default useAccountDetailHook;
