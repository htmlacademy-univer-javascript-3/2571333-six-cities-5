import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../recources/routes.ts';
import PrivateRoute from '../PrivateRoute/private-route.tsx';

import MainPage from '../../pages/MainPage/main-page.tsx';
import LoginPage from '../../pages/LoginPage/login-page.tsx';
import OfferPage from '../../pages/OfferPage/offer-page.tsx';
import FavoritesPage from '../../pages/FavoritesPage/favorites-page.tsx';
import NotFoundPage from '../../pages/NotFoundPage/not-found-page.tsx';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { ActionTypes } from '../../recources/action-types.ts';


function app(): JSX.Element {
  const isAuth = useAppSelector((state) => state[ActionTypes.USER].authorizationStatus);
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Login} element={
        <PrivateRoute isAuthorized={isAuth} hasToBeAuthorized={false}>
          <LoginPage />
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Offer} element={<OfferPage />} />
      <Route path={AppRoute.Favorites} element={
        <PrivateRoute isAuthorized={isAuth} hasToBeAuthorized>
          <FavoritesPage />
        </PrivateRoute>
      }
      />
      <Route path={'*'} element={<NotFoundPage />} />
    </Routes>
  );
}

export default app;
