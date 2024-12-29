import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../recources/Routes.ts';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';

import MainPage from '../../pages/MainPage/MainPage.tsx';
import LoginPage from '../../pages/LoginPage/LoginPage.tsx';
import OfferPage from '../../pages/OfferPage/OfferPage.tsx';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage.tsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.tsx';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import { ActionTypes } from '../../recources/ActionTypes.ts';


function App(): JSX.Element {
  const isAuth = useAppSelector((state) => state[ActionTypes.USER].authorizationStatus);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage/>} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuthorized={isAuth}>
            <FavoritesPage />
          </PrivateRoute>
        }
        />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
