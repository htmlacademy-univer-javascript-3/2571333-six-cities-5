import { Link } from 'react-router-dom';
import { AppRoute } from '../../recources/Routes.ts';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--notfound">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <div>
        <h1>404 Not Found</h1>
        <p>This page does not (yet) exist</p>
        <button>
          <Link to={AppRoute.Main}>Try going there</Link>
        </button>

      </div>
    </div>
  );
}


export default NotFoundPage;
