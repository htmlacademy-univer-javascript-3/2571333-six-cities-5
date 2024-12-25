import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Configuration } from './recources/Configuration';
import { offers } from './mocks/offers';
import { favoriteOffers } from './mocks/favoriteOffers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      numberOfOffers={Configuration.numberOfOffers}
      listOfOffers={offers}
      listOfFavoriteOffers = {favoriteOffers}
    />
  </React.StrictMode>
);
