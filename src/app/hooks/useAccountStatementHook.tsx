import { navigate, setParams } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useCallback, useEffect, useState } from 'react';

interface Props {}
const useAccountStatementHook = (props: Props) => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    setFromDate(new Date());
    setToDate(new Date());
  }, []);

  const onSearch = useCallback(() => {
    const randomTransactions: any[] = Array.from({ length: 30 }).map(
      (item, index) => 'item ' + index
    );
    setTransactions(randomTransactions);
  }, []);

  const onClickTransactionItem = useCallback((item) => {
    navigate(APP_SCREEN.TRANSACTION_DETAIL);
    setParams({ transaction: item });
  }, []);

  return {
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    onSearch,
    transactions,
    setTransactions,
    onClickTransactionItem,
  };
};

export default useAccountStatementHook;
