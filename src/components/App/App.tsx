import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../recources/Routes.ts';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';
import { CardProps } from '../Card/Card.tsx';

import MainPage from '../../pages/MainPage/MainPage.tsx';
import LoginPage from '../../pages/LoginPage/LoginPage.tsx';
import OfferPage from '../../pages/OfferPage/Offer.tsx';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage.tsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.tsx';


type AppProps = {
  numberOfOffers: number;
  listOfOffers: CardProps[];
  listOfFavoriteOffers: CardProps[];
};

function App({ numberOfOffers, listOfOffers, listOfFavoriteOffers }: AppProps): JSX.Element {
  const isAuth = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage numberOfOffers={numberOfOffers} listOfOffers={listOfOffers} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuthorized={isAuth}>
            <FavoritesPage listOfOffers={listOfFavoriteOffers}/>
          </PrivateRoute>

        }
        />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
