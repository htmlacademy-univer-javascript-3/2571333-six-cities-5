import { City } from '../../../components/Map/map';
import { CITIES } from '../../../recources/cities';
import { changeCity } from '../../actions';
import { cityReducer } from '../city-reducer';


describe('cityReducer', () => {
  const initialState = {
    city: CITIES.Paris
  };

  it('should return the initial state by default', () => {
    expect(cityReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle changeCity action', () => {
    const newCity: City = { name: 'Amsterdam', location: { latitude: 52.3676, longitude: 4.9041, zoom: 12 } };
    expect(cityReducer(initialState, changeCity(newCity))).toEqual({ city: newCity });
  });
});
