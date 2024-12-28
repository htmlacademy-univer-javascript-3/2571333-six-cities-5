import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../recources/Routes.ts';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';

import MainPage from '../../pages/MainPage/MainPage.tsx';
import LoginPage from '../../pages/LoginPage/LoginPage.tsx';
import OfferPage, { OfferPageProps } from '../../pages/OfferPage/OfferPage.tsx';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage.tsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.tsx';
import { CardProps } from '../../recources/Types.ts';
import { useAppSelector } from '../../hooks/useAppSelector.ts';


type AppProps = {
  listOfFavoriteOffers: CardProps[];
  offersProps: OfferPageProps[];
};

function App({ listOfFavoriteOffers, offersProps }: AppProps): JSX.Element {
  const isAuth = useAppSelector((state) => state.authorizationStatus);
  const tempFirstOfferProps: OfferPageProps = offersProps[0];
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage/>} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Offer} element={<OfferPage {...tempFirstOfferProps}/>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuthorized={isAuth}>
            <FavoritesPage listOfOffers={listOfFavoriteOffers} />
          </PrivateRoute>
        }
        />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
