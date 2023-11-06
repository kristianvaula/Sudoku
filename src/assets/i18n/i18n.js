import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import no from './no.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    no: no,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
