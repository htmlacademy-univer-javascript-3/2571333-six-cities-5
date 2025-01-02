import { Link } from 'react-router-dom';
import { AppRoute } from '../../recources/routes';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { fetchFavorites, userLogout } from '../../store/actionsAPI';
import HeaderPic from './header-pic';
import { useEffect, useMemo } from 'react';
import { ActionTypes } from '../../recources/action-types';

function PageHeader(): JSX.Element {

  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector((state) => state[ActionTypes.USER].authorizationStatus);
  const userData = useAppSelector((state) => state[ActionTypes.USER].userData);
  const favorites = useAppSelector((state) => state[ActionTypes.FAVORITES].favorites);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuthorized, userData]);


  const handleLogout = () => {
    dispatch(userLogout());
  };

  const favoritesCount = useMemo(() => <span className="header__favorite-count">{favorites.length}</span>, [favorites]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderPic />

          {isAuthorized && userData ? (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{userData.name}</span>
                    {favoritesCount}
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" onClick={handleLogout}>
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
