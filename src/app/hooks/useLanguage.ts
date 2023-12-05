import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { LANGUAGE_TYPE } from '@config/type';
import { selectLanguage, setLanguage } from '@redux/slices';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { changeLanguage } from '@utils/i18n/i18n';

const useLanguage = () => {
  const [t, i18n] = useTranslation();
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

//   useEffect(() => {
//     AppModule.setToolbarDoneBarButtonItemText(t('text:done_keyboard'));
//   }, [language]);

  const loadLanguage = useCallback(() => {
    changeLanguage(language === LANGUAGE_TYPE.vi ? LANGUAGE_TYPE.vi : LANGUAGE_TYPE.en);
  }, [language]);

  const onPressVn = useCallback(() => {
    changeLanguage(LANGUAGE_TYPE.vi);
    dispatch(setLanguage(LANGUAGE_TYPE.vi));
  }, []);

  const onPressEn = useCallback(() => {
    changeLanguage(LANGUAGE_TYPE.en);
    dispatch(setLanguage(LANGUAGE_TYPE.en));
  }, []);

  return {
    onPressVn,
    onPressEn,
    language: i18n.language,
    loadLanguage,
  };
};

export default useLanguage;
