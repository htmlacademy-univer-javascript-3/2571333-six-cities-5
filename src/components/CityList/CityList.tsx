import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { mockOffers } from '../../mocks/offers';
import { CITIES } from '../../recources/Cities';
import { setCity, setOffers } from '../../store/actions';

export const CityList = () => {
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        Object.entries(CITIES).map(([cityName, city]) => (
          <li key={cityName} className="locations__item">
            <a className={`locations__item-link tabs__item ${(cityName === currentCity.name) ? 'tabs__item--active' : null}`}
              href="#"
              onClick={() => {
                dispatch(setCity({city: city}));
                dispatch(setOffers({offers: mockOffers}));
              }}
            >
              <span>{cityName}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
};
