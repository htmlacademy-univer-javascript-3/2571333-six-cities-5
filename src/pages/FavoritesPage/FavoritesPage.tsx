import { useState } from 'react';
import OfferList from '../../components/OfferList/OfferList';
import { CardProps } from '../../recources/Types';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ActionTypes } from '../../recources/ActionTypes';

type FavoritesPageProps = {
  listOfOffers: CardProps[];
};

function FavoritesPage({ listOfOffers }: FavoritesPageProps): JSX.Element {
  // TODO add activeCard back as soon as you start using it
  // const [activeCard, setActiveCard] = useState<CardProps | undefined>(undefined);
  const [, setActiveCard] = useState<CardProps | undefined>(undefined);

  const userData = useAppSelector((state) => state[ActionTypes.USER].userData);
  const isAuthorized = useAppSelector((state) => state[ActionTypes.USER].authorizationStatus);

  function onOfferHover(hoveredCard: CardProps | undefined): void {
    setActiveCard(hoveredCard);
  }

  return (
    <div className="page">
      <PageHeader isAuthorized={isAuthorized} userData={userData} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <OfferList listOfOffers={listOfOffers} onOfferHover={onOfferHover} />
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <OfferList listOfOffers={listOfOffers} onOfferHover={onOfferHover} />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
