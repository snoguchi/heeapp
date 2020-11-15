import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import CssBaseline from '@material-ui/core/CssBaseline';
import { SocketManager } from './SocketManager';

export const App: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <SocketManager />
      {children}
    </Provider>
  );
};
