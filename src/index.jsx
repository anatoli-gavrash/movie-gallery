import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import './index.scss';
import App from 'components/App/App.jsx';
import storage from 'storage/storage.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storage}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
