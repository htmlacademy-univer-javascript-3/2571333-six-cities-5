import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { favoriteOffers } from './mocks/favoriteOffers';
import { mockOfferReviewsList } from './mocks/reviews';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        listOfFavoriteOffers={favoriteOffers}
        offersProps={mockOfferReviewsList}
      />
    </Provider>
  </React.StrictMode>
);
