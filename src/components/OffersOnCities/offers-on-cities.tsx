import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { ActionTypes } from '../../recources/action-types';
import { CardProps } from '../../recources/types';
import Card from '../Card/card';
import { changeFavorite } from '../../store/actionsAPI';

function OffersOnCities(): JSX.Element {
  const favorites = useAppSelector((state) => state[ActionTypes.FAVORITES].favorites);

  const cityToOffersMap = useMemo(() => {
    const citiesMap: Partial<Record<string, CardProps[]>> = {};
    favorites.forEach((offer) => {
      const city = offer.city.name;
      if (!citiesMap[city]) {
        citiesMap[city] = [];
      }
      citiesMap[city]?.push(offer);
    });
    return citiesMap;
  }, [favorites]);

  const UseAppDispatchLocalUsage = useAppDispatch();
  function changeToFavorites(id: string, isFavorite: boolean): void {
    UseAppDispatchLocalUsage(changeFavorite(
      {
        offerId: String(id),
        favoriteStatus: !isFavorite
      }
    ));
  }


  return (
    <ul className="favorites__list">
      {
        Object.entries(cityToOffersMap).map(([cityName, cityOffers]) => (
          <li className="favorites__locations-items" key={cityName}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{cityName}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places favorites__card place-card">
              {cityOffers?.map((offer) => (
                <Card
                  key={offer.id}
                  id={offer.id}
                  title={offer.title}
                  type={offer.type}
                  previewImage={offer.previewImage}
                  price={offer.price}
                  rating={offer.rating}
                  isPremium={offer.isPremium}
                  isFavorite={offer.isFavorite}
                  location={offer.location}
                  city={offer.city}
                  onFavoriteClick={changeToFavorites}
                />
              ))}
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default OffersOnCities;
