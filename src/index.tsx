import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Configuration } from './recources/Configuration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      numberOfOffers={Configuration.numberOfOffers}
    />
  </React.StrictMode>
);
