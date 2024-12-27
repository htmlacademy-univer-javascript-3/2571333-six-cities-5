import {createReducer} from '@reduxjs/toolkit';
import { CITIES } from '../recources/Cities';
import { changeCity, fillOffers, setOffersLoadingStatus, } from './actions';
import { City } from '../components/Map/Map';
import { CardProps } from '../recources/Types';

export type appState = {
  city: City;
  stateOffers: CardProps[];
  isLoadingOffers: boolean;
}

const startState: appState = {
  city: CITIES.Paris,
  stateOffers: [],
  isLoadingOffers: false
};

const reducer = createReducer(startState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.stateOffers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isLoadingOffers = action.payload;
    });
});

export {reducer};
