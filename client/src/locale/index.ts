import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from '../store';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import ja from './ja';

export const Locale: React.FC = () => {
  const lang = useSelector((state) => state.config.lang);

  i18next.use(initReactI18next).init({
    resources: { en, ja },
    lng: lang,
  });

  useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);

  return null;
};
