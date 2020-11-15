import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { HomePage } from './component/HomePage';

ReactDOM.render(
  <App>
    <HomePage />
  </App>,
  document.getElementById('app')
);
