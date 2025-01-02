import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { ActionTypes } from '../../recources/action-types';
import { CITIES } from '../../recources/cities';
import { changeCity} from '../../store/actions';

export const CityList = () => {
  const currentCity = useAppSelector((state) => state[ActionTypes.CITY].city);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        Object.entries(CITIES).map(([cityName, city]) => (
          <li key={cityName} className="locations__item">
            <a className={`locations__item-link tabs__item ${(cityName === currentCity.name) ? 'tabs__item--active' : null}`}
              href="#"
              onClick={() => {
                dispatch(changeCity(city));
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
