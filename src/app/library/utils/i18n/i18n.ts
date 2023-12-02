import { initReactI18next } from 'react-i18next';

import { ENVConfig } from '@config/env';
import i18n, { LanguageDetectorAsyncModule, Resource } from 'i18next';

import { LANGUAGE_TYPE } from '@config/type';
import { resources } from './locales';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback: (lng: string | readonly string[] | undefined) => void) => {
    callback(ENVConfig.DEFAULT_FALLBACK_LNG_I18n || LANGUAGE_TYPE.vi);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

export const initOptionsI18n = (source: Resource) => {
  return {
    compatibilityJSON: 'v3',
    fallbackLng: LANGUAGE_TYPE.vi,
    resources: source,

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    cache: {
      enabled: true,
    },

    interpolation: {
      defaultVariables: {
        hotline: '1900 5555 92',
      },
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  };
};

export const changeLanguage = (type: LANGUAGE_TYPE) => {
  i18n.changeLanguage(type || LANGUAGE_TYPE.vi);
};

// export const t18n = (key: I18nKeys, t18nOptions?: any) => key && i18n.t(key, t18nOptions);



/**
 * Config i18n for app
 */
// @ts-ignore
i18n.use(languageDetector).use(initReactI18next).init(initOptionsI18n(resources));

export default i18n;
