import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../locales/en.json';
import sv from '../locales/sv.json';
import pt from '../locales/pt.json';
import ko from '../locales/ko.json';
import eo from '../locales/eo.json';

export const languageResources = {
  pt: {translation: pt},
  en: {translation: en},
  sv: {translation: sv},
  ko: {translation: ko},
  eo: {translation: eo},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'pt',
  fallbackLng: 'pt',
  resources: languageResources,
});

export default i18next;