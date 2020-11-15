import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './component/App';
import { RoomPage } from './component/RoomPage';

ReactDOM.render(
  <App>
    <RoomPage />
  </App>,
  document.getElementById('app')
);
