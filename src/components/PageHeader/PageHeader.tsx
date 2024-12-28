import { Link } from 'react-router-dom';
import { AppRoute } from '../../recources/Routes';
import { useAppDispatch } from '../../hooks/useAppSelector';
import { userLogout } from '../../store/actionsAPI';
import { UserData } from '../../recources/Types';
import HeaderPic from './HeaderPic';

export type PageHeaderProps = {
    isAuthorized: boolean;
    userData: UserData | null;
}

function PageHeader({ isAuthorized, userData }: PageHeaderProps): JSX.Element {
  const tempNumberOfFavorites = 0;
  const NumberOfFavorites = tempNumberOfFavorites;

  const UseAppDispatchLocalUsage = useAppDispatch();

  function Logout() {
    UseAppDispatchLocalUsage(userLogout());
  }

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
                    <span className="header__favorite-count">{NumberOfFavorites}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" onClick={Logout}>
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
