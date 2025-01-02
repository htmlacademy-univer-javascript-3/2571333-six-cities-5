import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../recources/routes.ts';
import PrivateRoute from '../private-route/private-route.tsx';

import MainPage from '../../pages/main-page/main-page.tsx';
import LoginPage from '../../pages/login-page/login-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { ActionTypes } from '../../recources/action-types.ts';


function App(): JSX.Element {
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

export default App;
