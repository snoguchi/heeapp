import * as React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './store';

import CssBaseline from '@material-ui/core/CssBaseline';
import { SocketManager } from './component/SocketManager';

import en from './locales/en';
import ja from './locales/ja';

export const App: React.FC = ({ children }) => {
  console.log();

  i18n.use(initReactI18next).init({
    resources: { en, ja },
    lng: 'ja',
  });

  return (
    <Provider store={store}>
      <CssBaseline />
      <SocketManager />
      {children}
    </Provider>
  );
};
