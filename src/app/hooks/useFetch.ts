import { useCallback, useEffect, useState } from 'react';

const useFetch = <T>(callback: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNoLoading = useCallback(async () => {
    try {
      const response = await callback();
      setData(response);
      return response;
    } catch (error) {}
  }, [callback]);

  const fetchDefault = useCallback(
    async (refresh?: boolean) => {
      refresh ? setRefreshing(true) : setLoading(true);
      try {
        await fetchNoLoading();
      } catch (error) {
      } finally {
        refresh ? setRefreshing(false) : setLoading(false);
      }
    },
    [fetchNoLoading]
  );

  const onRefresh = useCallback(async () => {
    await fetchDefault(true);
  }, [fetchDefault]);

  useEffect(() => {
    fetchDefault();
  }, [fetchDefault]);

  return {
    fetchDefault,
    onRefresh,
    data,
    refreshing,
    loading,
    setData,
    fetchNoLoading,
    setLoading,
  };
};

export default useFetch;
