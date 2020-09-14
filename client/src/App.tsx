import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import CssBaseline from '@material-ui/core/CssBaseline';

export default function App({ children }) {
  return (
    <Provider store={store}>
      <CssBaseline />
      {children}
    </Provider>
  );
}
