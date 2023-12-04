import { hideLoading, showLoading } from '@components';
import { fakeAccounts } from '@fakeData/fakeAccounts';
import { LstAcctAccount } from '@model/account';
import { navigate, setParams } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {}
const useHomeHook = (props: Props) => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const [accounts, setAccounts] = useState<any>([]);

  useEffect(() => {
    fetchAccountList();
  }, []);

  const openDrawer = useCallback(() => {
    if (navigation.openDrawer && typeof navigation.openDrawer === 'function') {
      navigation.openDrawer();
    }
  }, []);

  const fetchAccountList = useCallback(async (data) => {
    showLoading();
    try {
      setTimeout(() => {
        setAccounts(fakeAccounts);
      }, 1500);
    } catch (error) {
    } finally {
      hideLoading();
    }
  }, []);

  const onClickAccount = useCallback((account: LstAcctAccount) => {
    navigate(APP_SCREEN.ACCOUNT_DETAIL);
    setParams({ account });
  }, []);

  return {
    openDrawer,
    accounts,
    setAccounts,
    onClickAccount,
  };
};

export default useHomeHook;
