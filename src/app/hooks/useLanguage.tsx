import { AppModule, dispatch } from '@common';
import { LANGUAGE_TYPE } from '@config/type';
import { selectLanguage } from '@redux-selector/app';
import { changeLanguage } from '@utils/i18n/i18n';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { commonActions } from '../redux/action-slice/common';

const useLanguage = () => {
  const [t, i18n] = useTranslation();
  const language = useSelector(selectLanguage);

  useEffect(() => {
    AppModule.setToolbarDoneBarButtonItemText(t('text:done_keyboard'));
  }, [language]);

  const loadLanguage = useCallback(() => {
    changeLanguage(language === LANGUAGE_TYPE.vi ? LANGUAGE_TYPE.vi : LANGUAGE_TYPE.en);
  }, [language]);

  const onPressVn = useCallback(() => {
    changeLanguage(LANGUAGE_TYPE.vi);
    dispatch(commonActions.setLanguage(LANGUAGE_TYPE.vi));
  }, []);

  const onPressEn = useCallback(() => {
    changeLanguage(LANGUAGE_TYPE.en);
    dispatch(commonActions.setLanguage(LANGUAGE_TYPE.en));
  }, []);

  return {
    onPressVn,
    onPressEn,
    language: i18n.language,
    loadLanguage,
  };
};

export default useLanguage;
