import { selectAppConfig, selectCodePushVersion } from '@redux-selector/app';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
const useUpdateCodePushDetailVersion = () => {
  const updateDetail = useSelector(selectCodePushVersion);
  const appConfig = useSelector(selectAppConfig);
  const package_size = useMemo(() => {
    const capacity = Number(updateDetail?.packageSize || 0);
    return (capacity / 1024 / 1024).toFixed(2) + ' MB';
  }, [updateDetail]);

  const appVersion = useMemo(() => {
    return updateDetail?.appVersion || '';
  }, [updateDetail]);

  const description = useMemo(() => {
    return updateDetail?.description || '';
  }, [updateDetail]);
  const logoPVCB = useMemo(() => {
    const theme = appConfig?.theme || 'default';
    if (theme === 'priority') return 'LOGO_BG_CODE_PUSH_DETAIL_PREMIER';
    if (theme === 'dark') return 'LOGO_BG_CODE_PUSH_DETAIL_DARK';
    return 'LOGO_BG_CODE_PUSH_DETAIL';
  }, [appConfig]);
  return {
    package_size,
    updateDetail,
    appVersion,
    description,
    logoPVCB,
  };
};
export default useUpdateCodePushDetailVersion;
