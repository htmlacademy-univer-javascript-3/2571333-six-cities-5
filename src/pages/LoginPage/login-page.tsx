import { FormEventHandler, useEffect } from 'react';
import HeaderPic from '../../components/PageHeader/header-pic';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { userLogin } from '../../store/actionsAPI';
import { authData } from '../../recources/types';
import { AppRoute } from '../../recources/routes';
import { useNavigate } from 'react-router-dom';
import { setOffersLoadingStatus } from '../../store/actions';
import { ActionTypes } from '../../recources/action-types';

function LoginPage(): JSX.Element {

  const UseAppDispatchLocalUsage = useAppDispatch();
  const UseNavigateLocalUsage = useNavigate();

  const handleLogin: FormEventHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email');
    const password = formData.get('password');
    if (email && password) {
      const user = {
        email: email,
        password: password
      };
      UseAppDispatchLocalUsage(userLogin(user as authData));
    }
    UseNavigateLocalUsage(AppRoute.Main);
  };


  const currentlyLoading = useAppSelector((state) => state[ActionTypes.OFFERS].isOffersDataLoading);
  useEffect(() => {
    if (!currentlyLoading) {
      return;
    }
    UseAppDispatchLocalUsage(setOffersLoadingStatus(currentlyLoading));

  }, [UseAppDispatchLocalUsage, currentlyLoading]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderPic />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleLogin}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Paris</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
