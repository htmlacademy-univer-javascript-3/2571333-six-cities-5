import {createReducer} from '@reduxjs/toolkit';
import { City } from '../../components/Map/Map';
import { CITIES } from '../../recources/Cities';
import { changeCity } from '../actions';


type CityState = {
  city: City;
};

const initialState: CityState = {
  city: CITIES.Paris,
};

const cityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export {cityReducer};
